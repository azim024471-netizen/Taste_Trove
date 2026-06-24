"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RecipePagination({ totalPages, totalRecipes, itemsPerPage }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    if (totalPages <= 1) return null;

    const setPage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page);
        router.push(`?${params.toString()}`);
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalRecipes);

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) pages.push("ellipsis");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("ellipsis");

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="mt-12 flex flex-col items-center gap-4 w-full">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                Showing {startItem}-{endItem} of {totalRecipes} results
            </p>

            <div className="w-full flex justify-center overflow-x-auto max-w-full py-2">
                <Pagination className="justify-center">
                    <Pagination.Content className="flex-nowrap gap-1 sm:gap-2">

                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={currentPage === 1}
                                onPress={() => setPage(currentPage - 1)}
                                className="px-2 sm:px-4 text-xs sm:text-sm min-w-0 h-9 sm:h-10"
                            >
                                <Pagination.PreviousIcon />
                                <span className="hidden sm:inline ml-1">Previous</span>
                            </Pagination.Previous>
                        </Pagination.Item>

                        {getPageNumbers().map((p, i) =>
                            p === "ellipsis" ? (
                                <Pagination.Item key={`e-${i}`}>
                                    <Pagination.Ellipsis className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm" />
                                </Pagination.Item>
                            ) : (
                                <Pagination.Item key={p}>
                                    <Pagination.Link
                                        isActive={p === currentPage}
                                        onPress={() => setPage(p)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm flex items-center justify-center min-w-0 rounded-lg"
                                    >
                                        {p}
                                    </Pagination.Link>
                                </Pagination.Item>
                            )
                        )}

                        {/* Next বাটন */}
                        <Pagination.Item>
                            <Pagination.Next
                                isDisabled={currentPage === totalPages}
                                onPress={() => setPage(currentPage + 1)}
                                className="px-2 sm:px-4 text-xs sm:text-sm min-w-0 h-9 sm:h-10"
                            >
                                <span className="hidden sm:inline mr-1">Next</span>
                                <Pagination.NextIcon />
                            </Pagination.Next>
                        </Pagination.Item>

                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    );
}