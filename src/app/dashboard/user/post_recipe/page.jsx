'use client'

import { authClient } from '@/lib/auth-client';
import { postRecipe } from '@/lib/server_actions/recipes';
import { Button, Form, toast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaGlobe, FaTrophy, FaLayerGroup, FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaUtensils, FaUsers } from 'react-icons/fa';

const AddRecipePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [uploadingImage, setUploadingImage] = useState(false);
    const [recipeImageUrl, setRecipeImageUrl] = useState("");

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const apiKey = process.env.NEXT_PUBLIC_IMG_KEY;

        if (!apiKey) {
            toast({
                title: "Error",
                description: "ImgBB API Key is missing in .env.local!",
                color: "danger"
            });
            setUploadingImage(false);
            return;
        }

        try {
            const imgFormData = new FormData();
            imgFormData.append('image', file);

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: imgFormData,
            });

            const data = await res.json();

            if (data.success) {
                setRecipeImageUrl(data.data.url);
                toast({
                    title: "Success",
                    description: "Recipe image uploaded successfully!",
                    color: "success"
                });
            } else {
                toast({
                    title: "Upload Failed",
                    description: "Failed to upload image to ImgBB.",
                    color: "danger"
                });
            }
        } catch (error) {
            console.error("ImgBB Upload Error:", error);
            toast({
                title: "Error",
                description: "Something went wrong during image upload.",
                color: "danger"
            });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAddRecipe = async (e) => {
        e.preventDefault();

        if (!recipeImageUrl) {
            toast({
                title: "Image Required",
                description: "Please upload a recipe image first!",
                color: "warning"
            });
            return;
        }

        setLoading(true);
        const formTarget = e.currentTarget;
        const formData = new FormData(formTarget);
        const dataEntries = Object.fromEntries(formData.entries());

        const recipeData = {
            ...dataEntries,
            recipeImage: recipeImageUrl, 
            preparationTime: Number(dataEntries.preparationTime),
            ingredients: dataEntries.ingredients ? dataEntries.ingredients.split(',').map(item => item.trim()) : [],
            authorId: user?.id || "unknown_id",
            authorName: user?.name || "Anonymous",
            authorEmail: user?.email || "unknown_email",
            likesCount: 0,
            isFeatured: false,
            status: "published",

        };

        try {
          
            const data = await postRecipe(recipeData);

            if (data?.insertedId) {
                toast({
                    title: "Success",
                    description: "Recipe published successfully!",
                    color: "success"
                });

                formTarget.reset();
                setRecipeImageUrl("");
                router.push('/recipes');
            } else {
                toast({
                    title: "Failed",
                    description: "Failed to create recipe. Try again.",
                    color: "danger"
                });
            }
        } catch (error) {
            console.log(error, 'post error');
            toast({
                title: "Error",
                description: "Failed to publish recipe!",
                color: "danger"
            });
        } finally {
            setLoading(false);
        }
    };

    const labelStyle = "text-xs font-semibold text-zinc-400 mb-2 block tracking-wide";
    const inputStyle = "w-full h-11 px-4 bg-zinc-800/60 text-zinc-100 text-sm rounded-xl border border-zinc-700/40 outline-none focus:border-rose-500/50 placeholder:text-zinc-600 transition-all";
    const selectContainerStyle = "flex items-center gap-2 px-3 bg-zinc-800/60 border border-zinc-700/40 rounded-xl h-11 focus-within:border-rose-500/50 transition-all w-full";
    const selectStyle = "w-full bg-transparent text-zinc-300 text-sm outline-none border-none cursor-pointer pr-2 [&>option]:bg-zinc-800 [&>option]:text-zinc-200 appearance-none";

    return (
        <div className='min-h-screen w-full bg-[#09090b] p-4 sm:p-6 md:p-10 font-sans text-zinc-200 flex items-center justify-center'>
            <div className='w-full max-w-7xl mx-auto flex justify-center items-center'>
                <div className="w-full max-w-175 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">

                    <div className='p-6 sm:p-8 border-b border-zinc-800/60 flex justify-between items-center bg-zinc-900/50'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-xl bg-rose-600/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-inner'>
                                <FaUtensils className='text-lg' />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg sm:text-xl text-zinc-100 tracking-tight flex items-center gap-2">
                                    TasteTrove <span className='text-xs font-normal text-zinc-500 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full'>Recipe Studio</span>
                                </h2>
                                <p className='text-xs text-zinc-500 mt-0.5 font-medium'>Create and share your elite culinary masterpieces.</p>
                            </div>
                        </div>
                        <button type="button" onClick={() => router.back()} className='text-zinc-500 hover:text-zinc-300 transition-all text-lg'>✕</button>
                    </div>

                    <Form onSubmit={handleAddRecipe} className="w-full flex flex-col">
                        <div className='p-6 sm:p-8 flex flex-col gap-5'>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                                <div className="w-full">
                                    <label className={labelStyle}>Recipe Name</label>
                                    <input required name="recipeName" type="text" placeholder="e.g., Smoked Mustard Salmon" className={inputStyle} />
                                </div>
                                <div className="w-full">
                                    <label className={labelStyle}>Category</label>
                                    <div className={selectContainerStyle}>
                                        <FaLayerGroup className="text-zinc-500 text-sm shrink-0" />
                                        <select required name="category" defaultValue="" className={selectStyle}>
                                            <option value="" disabled hidden>Select Category</option>
                                            <option value="breakfast">Breakfast</option>
                                            <option value="lunch">Lunch</option>
                                            <option value="dinner">Dinner</option>
                                            <option value="dessert">Desserts & Sweets</option>
                                            <option value="drinks">Beverages</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                                <div className="w-full">
                                    <label className={labelStyle}>Cuisine Type</label>
                                    <div className={selectContainerStyle}>
                                        <FaGlobe className="text-zinc-500 text-sm shrink-0" />
                                        <select required name="cuisineType" defaultValue="" className={selectStyle}>
                                            <option value="" disabled hidden>Select Unique Cuisine</option>
                                            <option value="traditional_bengali">Traditional Bengali</option>
                                            <option value="japanese_zen">Japanese (Sushi/Zen)</option>
                                            <option value="mediterranean_herbs">Mediterranean</option>
                                            <option value="turkish_delight">Turkish & Middle Eastern</option>
                                            <option value="thai_exotic">Thai / Southeast Asian</option>
                                            <option value="mexican_fiesta">Mexican Tex-Mex</option>
                                            <option value="french_bistro">French Fine Dining</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className={labelStyle}>Prep Time (Minutes)</label>
                                    <input required name="preparationTime" type="number" min="1" placeholder="Preparation Time" className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full items-end">
                                <div className="w-full">
                                    <label className={labelStyle}>Difficulty Level</label>
                                    <div className={selectContainerStyle}>
                                        <FaTrophy className="text-zinc-500 text-sm shrink-0" />
                                        <select required name="difficultyLevel" defaultValue="" className={selectStyle}>
                                            <option value="" disabled hidden>Select Difficulty</option>
                                            <option value="easy">Easy (Beginner)</option>
                                            <option value="medium">Medium (Intermediate)</option>
                                            <option value="hard">Hard (Expert)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className={labelStyle}>Recipe Cover Image</label>
                                    <div className="flex items-center gap-3 bg-zinc-800/40 border border-zinc-700/40 rounded-xl p-2 h-11 overflow-hidden">
                                        <label className="h-full px-3 bg-zinc-700/60 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all shrink-0">
                                            {uploadingImage ? <FaSpinner className="animate-spin text-sm" /> : recipeImageUrl ? <FaCheckCircle className="text-emerald-500 text-sm" /> : <FaCloudUploadAlt className="text-sm" />}
                                            {uploadingImage ? "Uploading..." : recipeImageUrl ? "Change" : "Upload"}
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                        <div className="text-xs text-zinc-500 truncate w-full">
                                            {recipeImageUrl ? <span className="text-rose-400 font-medium">Image Upload Success!</span> : "PNG, JPG up to 5MB"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                                <div className="w-full">
                                    <label className={labelStyle}>Ingredients (Separate with comma)</label>
                                    <input required name="ingredients" type="text" placeholder="Salmon, Mustard, Green Chillies" className={inputStyle} />
                                </div>
                                <div className="w-full">
                                    <label className={labelStyle}>Servings / Portions</label>
                                    <div className={selectContainerStyle}>
                                        <FaUsers className="text-zinc-500 text-sm shrink-0" />

                                        <select required name="servings" defaultValue="" className={selectStyle}>
                                            <option value="" disabled hidden>Select Servings</option>
                                            <option value="1_person">1 Person</option>
                                            <option value="2_people">2 People</option>
                                            <option value="4_people">4 People</option>
                                            <option value="6_plus">6+ People</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <label className={labelStyle}>Instructions</label>
                                <textarea required name="instructions" placeholder="Step 1...&#10;Step 2..." rows={4} className="w-full p-4 text-zinc-100 bg-zinc-800/60 border border-zinc-700/40 rounded-xl outline-none focus:border-rose-500/50 placeholder:text-zinc-600 text-sm resize-none transition-all" />
                            </div>
                        </div>

                        <div className='p-4 sm:p-6 bg-zinc-950/40 border-t border-zinc-800/60 flex justify-end items-center gap-3'>
                            <Button type="button" variant="light" onPress={() => router.back()} className="h-10 px-5 text-sm font-semibold text-zinc-400 bg-transparent hover:bg-zinc-800 rounded-xl transition-all">
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={loading} disabled={uploadingImage} className="h-10 px-6 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-rose-600/10 active:scale-[0.98] disabled:opacity-50">
                                {loading ? "Publishing..." : "Publish Recipe"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddRecipePage;