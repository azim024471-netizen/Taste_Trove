"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react"; 
import { BiUser } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

export function UpdateProfileModal({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const onSubmit = async (e) => {
    e.preventDefault();

    const finalName = name.trim() === "" ? (user?.name || "") : name;
    const finalImage = image.trim() === "" ? (user?.image || "") : image;

    try {
      await authClient.updateUser({
        name: finalName,
        image: finalImage,
      });
      
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Modal>
      <Button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/10 transition-all self-center sm:self-end mb-2" >
        <FaUserEdit className="text-base" />
        <span>Update Profile</span>
      </Button>

      <Modal.Backdrop className="backdrop-blur-md bg-zinc-950/50">
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-rose-500/10 text-rose-500">
                <BiUser className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Update User</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  
                  <TextField className="w-full" type="text">
                    <Label className="text-zinc-600 dark:text-zinc-400 font-medium text-sm">Name</Label>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Enter your name" 
                    />
                  </TextField>
                  
                  <TextField className="w-full" type="url">
                    <Label className="text-zinc-600 dark:text-zinc-400 font-medium text-sm">Image URL</Label>
                    <Input 
                      value={image} 
                      onChange={(e) => setImage(e.target.value)} 
                      placeholder="Image URL" 
                    />
                  </TextField>

                  <Modal.Footer className="mt-2">
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" slot="close" className="bg-rose-500 hover:bg-rose-600
                     text-white font-bold transition-all">
                      Save
                    </Button>
                  </Modal.Footer>
                </form>

              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}