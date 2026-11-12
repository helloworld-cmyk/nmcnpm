import { noAuthApi } from "../../method";

/* Phản hồi /areas: một địa điểm trong danh mục tìm kiếm. */
export type AreaResponse = {
  id: string;
  parentId: string | null;
  code: string;
  name: string;
  type: string;
};

/* Tham số tìm kiếm địa điểm; tất cả đều tùy chọn. */
export type GetAreasQuery = {
  keyword?: string;
  parentId?: string;
  type?: string;
};

/* Gọi API tìm kiếm địa điểm đang hoạt động (lọc theo từ khóa, địa điểm cha, cấp địa điểm). */
export function getAreasAPI(query?: GetAreasQuery): Promise<AreaResponse[]> {
  return noAuthApi.get<AreaResponse[]>("/areas", {
    params: {
      keyword: query?.keyword,
      parentId: query?.parentId,
      type: query?.type,
    },
  });
}
