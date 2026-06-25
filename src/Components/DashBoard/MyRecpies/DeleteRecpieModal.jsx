
'use client';

import { deleteRecpie } from "@/lib/server_actions/recipes";
import { AlertDialog, Button, toast } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegFlag, FaTrash } from "react-icons/fa";

const DeleteRecpieModal = ({ recipe ,isAdmin = false }) => {
    const { _id, recipeName } = recipe;

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            const data = await deleteRecpie(_id);

            if (data?.deletedCount > 0) {
                toast.success("Recipe Removed", {
                    description: `${recipeName} has been removed successfully.`,
                });

                router.refresh();
            } else {
                toast.warning("Recipe Not Found", {
                    description: "We couldn't find this recipe.",
                });
            }
        } catch (error) {
            console.error(error);

            toast.error("Delete Failed", {
                description:
                    "Something went wrong. Please try again later.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            {isAdmin ? (
                <Button
                    className="font-bold rounded-xl text-xs px-3 h-8 min-w-0 transition active:scale-95 flex items-center justify-center gap-1
                        bg-red-600 text-white hover:bg-red-700
                        md:bg-red-50 md:text-red-600 md:border md:border-red-200 md:hover:bg-red-100 md:shadow-sm"
                >
                    <FaTrash size={12} />
                    <span className="hidden md:inline">Delete</span> {/* 📱 মোবাইলে হাইড, 🖥️ ডেস্কটপে শো */}
                </Button>
            ) : (
                <Button
                    className="flex flex-col items-center justify-center gap-1 bg-white hover:bg-red-50/50 border border-orange-100/60 rounded-xl py-2.5 text-red-600 transition-colors"
                >
                    <FaTrash className="text-sm" />
                    <span className="text-[10px] font-bold">Delete</span>
                </Button>
            )}

            <AlertDialog.Backdrop
                variant="blur"
                className="bg-black/40 backdrop-blur-sm"
            >
                <AlertDialog.Container>
                    <AlertDialog.Dialog
                        className="max-w-md bg-white rounded-3xl border border-zinc-200 shadow-2xl"
                    >
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete Recipe
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <div className="space-y-4">

                                <div className="rounded-2xl overflow-hidden border border-zinc-200">
                                    <div className="rounded-2xl overflow-hidden border border-zinc-200 relative h-40">
                                        <Image
                                            src={recipe.recipeImage}
                                            alt={recipeName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="font-bold text-lg">
                                        {recipeName}
                                    </h3>

                                    <p className="text-zinc-500 mt-2 text-sm">
                                        This action cannot be undone.
                                        The recipe will be permanently removed.
                                    </p>
                                </div>
                            </div>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button slot="close" variant="bordered">
                                Cancel
                            </Button>

                            <Button slot="close" onClick={handleDelete} isLoading={isDeleting}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                {isDeleting
                                    ? "Deleting..."
                                    : "Delete Recipe"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteRecpieModal;



