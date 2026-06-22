"use client";
import React, { useState } from "react";
import { Button, FieldError, Form, Input, Label, Modal, TextArea, TextField, toast } from "@heroui/react";
import { MdOutlineCategory, MdOutlineTimer, MdOutlineRestaurantMenu } from "react-icons/md";
import { FaEdit, FaUtensils, FaGlobe, FaUsers, FaList } from "react-icons/fa";
import { CgEditContrast } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { updateRecpieFunction } from "@/lib/server_actions/recipes";
const UpdateRecpieModal = ({ recipe }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { _id, recipeName, category, cuisineType, preparationTime, difficultyLevel,
    servings, ingredients, instructions } = recipe || {};

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updateData = Object.fromEntries(formData);

    if (updateData.ingredients) {
      updateData.ingredients = updateData.ingredients.split(",").map((item) => item.trim());
    }
    if (updateData.preparationTime) {
      updateData.preparationTime = Number(updateData.preparationTime);
    }

    try {
      const data = await updateRecpieFunction(_id, updateData)

      if (data.modifiedCount > 0) {
        toast.success("Recipe Updated", {
          description: `You have successfully updated ${recipeName || "the recipe"}.`,
          actionProps: {
            variant: "flat",
          },
        });
          setIsOpen(false);
        router.refresh();
      } else {
        toast.warning("Could Not Update", {
          description: "You have to change at least one thing to update.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.danger("Update Failed", {
        description: "Something went wrong. Please try again later.",
        indicator: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputContainerStyle = "flex items-center gap-2 px-3 bg-zinc-800/80 border border-zinc-700 rounded-xl h-11 focus-within:border-rose-400/60 focus-within:bg-zinc-800 transition-all w-full text-zinc-100";
  const selectStyle = "w-full bg-transparent text-zinc-200 rounded-xl text-sm outline-none border-none cursor-pointer pr-2 [&>option]:bg-zinc-900 [&>option]:text-zinc-200";

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>

      <Button onClick={() => setIsOpen(true)}
      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-amber-100
              dark:bg-rose-950/40 text-amber-600 dark:text-rose-400 rounded-xl hover:bg-amber-600 hover:text-white
               dark:hover:bg-rose-900/60 transition active:scale-95">
        <FaEdit className="text-xs" /> Edit Recipe
      </Button>

      <Modal.Backdrop
        variant="blur"
        className="bg-black/60 backdrop-blur-md"
      >
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-4xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-2xl rounded-2xl">
            <Modal.CloseTrigger className="text-zinc-400 hover:text-zinc-100" />

            <Modal.Header className="flex flex-col items-center text-center border-b border-zinc-800 pb-4">
              <div className="p-3 bg-rose-400/10 text-rose-600 border border-rose-400/20 rounded-full mb-3">
                <MdOutlineRestaurantMenu className="size-6" />
              </div>
              <Modal.Heading className="text-2xl font-bold tracking-tight text-zinc-100">
                Modify Your Recipe
              </Modal.Heading>
              <p className="mt-1 text-sm text-zinc-400 max-w-md">
                Update your culinary creation's details, ingredients, and steps to keep your audience inspired.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <TextField
                    isRequired
                    defaultValue={recipeName}
                    name="recipeName"
                    className="w-full"
                    validate={(value) => {
                      if (value.length < 3) return "Name must be at least 3 characters";
                      return null;
                    }}
                  >
                    <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                      Recipe Name
                    </Label>
                    <div className={inputContainerStyle}>
                      <FaUtensils className="text-zinc-500 text-sm shrink-0" />
                      <Input placeholder="Enter Recipe Name" className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder:text-zinc-500" />
                    </div>
                    <FieldError className="text-red-400 text-xs mt-1" />
                  </TextField>

                  <div className="w-full">
                    <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                      Category
                    </Label>
                    <div className={inputContainerStyle}>
                      <MdOutlineCategory className="text-zinc-500 text-base shrink-0" />
                      <select required name="category" defaultValue={category} className={selectStyle}>
                        <option value="" disabled hidden>Select Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="dessert">Dessert</option>
                        <option value="drinks">Drinks</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                      Cuisine Type
                    </Label>
                    <div className={inputContainerStyle}>
                      <FaGlobe className="text-zinc-500 text-sm shrink-0" />
                      <select required name="cuisineType" defaultValue={cuisineType} className={selectStyle}>
                        <option value="" disabled hidden>Select Cuisine</option>
                        <option value="bengali">Traditional Bengali</option>
                        <option value="italian">Italian Fine Dining</option>
                        <option value="japanese">Japanese Sushi</option>
                        <option value="mexican">Mexican Fiesta</option>
                        <option value="turkish">Turkish Delight</option>
                      </select>
                    </div>
                  </div>

                  <TextField
                    isRequired
                    type="number"
                    name="preparationTime"
                    className="w-full"
                    defaultValue={preparationTime}
                  >
                    <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                      Prep Time (Minutes)
                    </Label>
                    <div className={inputContainerStyle}>
                      <MdOutlineTimer className="text-zinc-500 text-base shrink-0" />
                      <Input placeholder="e.g., 30" className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder:text-zinc-500" />
                    </div>
                  </TextField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                      Difficulty Level
                    </Label>
                    <div className={inputContainerStyle}>
                      <CgEditContrast className="text-zinc-500 text-base shrink-0" />
                      <select required name="difficultyLevel" defaultValue={difficultyLevel} className={selectStyle}>
                        <option value="" disabled hidden>Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full">
                    <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                      Servings
                    </Label>
                    <div className={inputContainerStyle}>
                      <FaUsers className="text-zinc-500 text-base shrink-0" />
                      <select required name="servings" defaultValue={servings} className={selectStyle}>
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
                  <TextField
                    isRequired
                    name="ingredients"
                    className="w-full"
                    defaultValue={ingredients ? ingredients.join(", ") : ""}
                  >
                    <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                      Ingredients (Separate with comma)
                    </Label>
                    <div className={inputContainerStyle}>
                      <FaList className="text-zinc-500 text-xs shrink-0" />
                      <Input placeholder="e.g., Rice, Sugar, Milk, Cardamom" className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder:text-zinc-500" />
                    </div>
                  </TextField>
                </div>

                <div className="w-full">
                  <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
                    Instructions
                  </Label>
                  <div className="p-3 bg-zinc-800/80 border border-zinc-700 rounded-xl focus-within:border-rose-400/60 focus-within:bg-zinc-800 transition-all">
                    <TextArea
                      defaultValue={instructions}
                      required
                      name="instructions"
                      placeholder="Write step by step cooking instructions..."
                      rows={4}
                      className="w-full text-zinc-200 bg-transparent outline-none border-none placeholder:text-zinc-500 text-sm resize-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-rose-600 hover:bg-rose-100 hover:text-rose-500 text-white font-extrabold text-sm 
                  rounded-xl shadow-lg transition-all duration-300 mt-4 
                  flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "SAVING CHANGES..." : "SAVE CHANGES"} <FaUtensils />
                </Button>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateRecpieModal;

