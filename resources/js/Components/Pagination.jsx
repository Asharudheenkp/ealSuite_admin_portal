const Pagination = ({ paginationData, handlePageChange }) => {
    return (
        <div className="p-4 bg-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">
                Showing {paginationData.from}-{paginationData.to} of{" "}
                {paginationData.total}
            </p>
            <div className="flex space-x-2">
                {paginationData.prev_page_url && (
                    <button
                        onClick={() =>
                            handlePageChange(paginationData.current_page - 1)
                        }
                        disabled={!paginationData.prev_page_url}
                        className={`px-3 py-1 border rounded-lg ${
                            paginationData.prev_page_url
                                ? "bg-white text-gray-600 hover:bg-blue-600 hover:text-white"
                                : "bg-gray-300 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Previous
                    </button>
                )}

                {paginationData.next_page_url && (
                    <button
                        onClick={() =>
                            handlePageChange(paginationData.current_page + 1)
                        }
                        disabled={!paginationData.next_page_url}
                        className={`px-3 py-1 border rounded-lg ${
                            paginationData.next_page_url
                                ? "bg-white text-gray-600 hover:bg-blue-600 hover:text-white"
                                : "bg-gray-300 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pagination;
