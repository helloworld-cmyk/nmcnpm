/* Kiểu dữ liệu chuyến xe dùng chung cho các endpoint /trips (đối chiếu DTO backend). */

/* Trạng thái vận hành của chuyến. */
export type TripStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "TERMINATED";

/* Trạng thái mở bán của chuyến. */
export type TripSalesStatus = "CLOSED" | "OPEN" | "PAUSED";

/* Thông tin chuyến xe. */
export type TripResponse = {
  id: string;
  companyId: string;
  companyName: string;
  routeId: string;
  routeCode: string;
  routeName: string;
  originAreaId: string;
  originAreaName: string;
  destinationAreaId: string;
  destinationAreaName: string;
  tripCode: string;
  departureAt: string;
  expectedArrivalAt: string;
  actualDepartureAt: string | null;
  actualArrivalAt: string | null;
  bookingCutoffAt: string | null;
  baseFareAmount: number;
  status: TripStatus;
  salesStatus: TripSalesStatus;
  createdAt: string;
  updatedAt: string;
};

/* Ghế và tình trạng còn trống của chuyến. */
export type TripSeatResponse = {
  id: string;
  seatCode: string;
  seatClass: string;
  deck: number;
  rowNo: number;
  columnNo: number;
  available: boolean;
};
