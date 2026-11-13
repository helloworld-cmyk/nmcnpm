"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAreas } from "@/api/area/tanstack/use-areas";
import { useSearchTrips } from "@/api/trip/tanstack/use-search-trips";
import { useTripSeatsAvailability } from "@/api/trip/tanstack/use-trip-seats-availability";
import {
  PER_PAGE,
  filterRides,
  sortRides,
  useSearchFiltersStore,
} from "@/global-states/search-filters-store";
import { toRide, withSeatAvailability } from "../_utils/to-ride";
import { findArea, tomorrowISO } from "../_utils/search-params";

/*
 * Gom toàn bộ logic màn kết quả tìm kiếm: đọc tham số URL, đổi tên địa điểm
 * thành area id, gọi API chuyến, lọc/sắp xếp/phân trang và câu trạng thái.
 * Component chỉ còn phần render.
 */
export function useSearchResults() {
  const searchParams = useSearchParams();
  const from = (searchParams.get("from") || "").trim();
  const to = (searchParams.get("to") || "").trim();
  const fromId = (searchParams.get("fromId") || "").trim();
  const toId = (searchParams.get("toId") || "").trim();
  const hasAreaIds = Boolean(fromId && toId);
  const dateParam = searchParams.get("date") || "";
  const departureDate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam)
    ? dateParam
    : tomorrowISO();

  const sort = useSearchFiltersStore((state) => state.sort);
  const timeFrom = useSearchFiltersStore((state) => state.timeFrom);
  const timeTo = useSearchFiltersStore((state) => state.timeTo);
  const page = useSearchFiltersStore((state) => state.page);
  const goToPage = useSearchFiltersStore((state) => state.goToPage);
  const resetFilters = useSearchFiltersStore((state) => state.resetFilters);

  /*
   * Ưu tiên id địa điểm do form tìm chuyến gửi kèm. Chỉ khi URL thiếu id
   * (link trực tiếp hoặc tuyến gợi ý) mới nạp danh mục để suy id theo tên.
   */
  const areasQuery = useAreas(undefined, { enabled: !hasAreaIds });
  const areas = areasQuery.data;
  const originArea = useMemo(
    () => (hasAreaIds ? undefined : findArea(areas, from)),
    [hasAreaIds, areas, from],
  );
  const destinationArea = useMemo(
    () => (hasAreaIds ? undefined : findArea(areas, to)),
    [hasAreaIds, areas, to],
  );

  const originAreaId = fromId || originArea?.id || "";
  const destinationAreaId = toId || destinationArea?.id || "";

  /* Có id thì sẵn sàng ngay; suy theo tên thì phải chờ danh mục tải xong mới kết luận */
  const areasLoading = !hasAreaIds && areasQuery.isPending;
  const areasSettled = hasAreaIds || areas !== undefined;
  const areaMissing =
    areasSettled && (!originAreaId || !destinationAreaId);
  const areaError = !hasAreaIds && areasQuery.isError;

  const tripsQuery = useSearchTrips(
    { originAreaId, destinationAreaId, departureDate },
    { enabled: Boolean(originAreaId && destinationAreaId) },
  );

  const rides = useMemo(
    () => (tripsQuery.data ?? []).map(toRide),
    [tripsQuery.data],
  );

  const filtered = useMemo(
    () => sortRides(filterRides(rides, { timeFrom, timeTo }), sort),
    [rides, sort, timeFrom, timeTo],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const pageItems = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );
  const showList =
    !areaMissing && !areaError && tripsQuery.isSuccess && filtered.length > 0;

  /* Ghép số ghế trống cho các chuyến đang hiển thị (tối đa PER_PAGE mỗi trang) */
  const seatsQuery = useTripSeatsAvailability(
    showList ? pageItems.map((ride) => ride.id) : [],
  );
  const pageItemsWithSeats = pageItems.map((ride) =>
    withSeatAvailability(ride, seatsQuery.availability[ride.id] ?? null),
  );

  const statusText = useMemo(() => {
    if (areaError) return "Không tải được danh mục địa điểm.";
    if (areaMissing) return "Chưa nhận diện được địa điểm bạn nhập.";
    if (areasLoading || tripsQuery.isPending)
      return "Đang tải chuyến phù hợp...";
    if (tripsQuery.isError) return "Không tải được danh sách chuyến.";
    if (!filtered.length)
      return rides.length
        ? "Không còn chuyến nào khớp bộ lọc hiện tại."
        : "Không có chuyến nào khớp tìm kiếm.";

    const base =
      filtered.length === rides.length
        ? `Tìm thấy ${rides.length} chuyến khớp tìm kiếm`
        : `Khớp ${filtered.length}/${rides.length} chuyến theo bộ lọc`;
    return pages > 1 ? `${base} · Trang ${safePage}/${pages}` : base;
  }, [
    areaError,
    areaMissing,
    areasLoading,
    tripsQuery.isPending,
    tripsQuery.isError,
    filtered.length,
    rides.length,
    pages,
    safePage,
  ]);

  return {
    statusText,
    pageItems: pageItemsWithSeats,
    pages,
    safePage,
    showList,
    areaError,
    areaMissing,
    isPending: areasLoading || tripsQuery.isPending,
    isTripsPending: tripsQuery.isPending,
    isTripsError: tripsQuery.isError,
    isTripsSuccess: tripsQuery.isSuccess,
    goToPage,
    resetFilters,
    retryAreas: () => void areasQuery.refetch(),
    retryTrips: () => void tripsQuery.refetch(),
  };
}
