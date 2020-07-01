const RESULTS = 1000;
const PER_PAGE = 50;

class PaginationInfo {
  constructor(currentPageNo, perPage, totalResults) {
    this.currentPageNo = currentPageNo;
    this.perPage = perPage;
    this.totalResults = totalResults;
  }

  totalPages() {
    return Math.ceil(this.totalResults / this.perPage);
  }

  hasMore() {
    return this.currentPageNo < this.totalPages();
  }

  static createPagination(currentPageNo) {
    return new PaginationInfo(currentPageNo, PER_PAGE, RESULTS);
  }
}
export default PaginationInfo;
