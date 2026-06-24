


'use client';

import { postReportFuntion } from '@/lib/server_actions/reports';
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextArea,
    TextField,
    toast,
} from '@heroui/react';
import { FaFlag, FaRegFlag } from 'react-icons/fa';
import { useState } from 'react';

const ReportModal = ({ recipe, user }) => {
    const [loading, setLoading] = useState(false);

    const handleReport = async (e) => {
        e.preventDefault();

        const form = e.target;

        const reportData = {
            repotertedBy: user?.id,
            reporterName: user?.name,
            reporterEmail: user?.email,

            recipeId: recipe?._id,
            recipeName: recipe?.recipeName,
            recipeImage: recipe?.recipeImage,
            category: recipe?.category,

            reason: form.reason.value,

            reportedAt: new Date(),
            status: 'pending',
        };

        try {
            setLoading(true);

            const result = await postReportFuntion(reportData);

            if (result?.success) {
                toast.success('Recipe Reported', {
                    description: `${recipe.recipeName} has been reported successfully.`,
                });

                form.reset();
            } else {
                toast.warning('Already Reported', {
                    description:
                        result?.message ||
                        'You have already reported this recipe.',
                });
            }
        } catch (error) {
            console.error(error);

            toast.error('Report Failed', {
                description:
                    error?.message ||
                    'Something went wrong. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>



            <Button
                variant="light"
                className="flex flex-col items-center  justify-center gap-1 bg-white hover:bg-red-50/50 border
 border-orange-100/60 rounded-xl py-2.5  text-zinc-700 hover:text-red-600 transition-colors"
            >
                <FaRegFlag className="text-sm" />
                <span className="text-[10px] font-bold">Report</span>
            </Button>

            <Modal.Backdrop variant="blur">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md bg-white rounded-3xl border border-orange-100 shadow-xl">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-red-100 text-red-600">
                                <FaFlag />
                            </Modal.Icon>

                            <Modal.Heading>          Report Recipe   </Modal.Heading>

                            <p className="mt-2 text-sm text-zinc-500">
                                Report this recipe if it contains misleading,
                                inappropriate, or harmful content.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface
                                variant="default"
                                className="border border-orange-100 rounded-2xl p-4"
                            >
                                <div className="mb-4">
                                    <h3 className="font-bold text-zinc-800">
                                        {recipe?.recipeName}
                                    </h3>

                                    <p className="text-xs text-zinc-500 mt-1">
                                        Category: {recipe?.category}
                                    </p>
                                </div>

                                <form
                                    id="report-form"
                                    onSubmit={handleReport}
                                    className="space-y-4"
                                >
                                    
                                   
                                    <TextField className="w-full">
  <Label>
    Why are you reporting this recipe?
  </Label>

  <select
    name="reason"
    required
    className=" w-full h-12rounded-xl border border-orange-200 bg-[#FFF8F5] px-4 text-sm  text-zinc-700
      outline-none
      focus:border-rose-400
      focus:ring-2
      focus:ring-rose-100
    "
  >
    <option value="">Select a reason</option>
    <option value="Spam"> Spam</option>
    <option value="Offensive Content"> Offensive Content</option>
    <option value="Copyright Issue">Copyright Issue</option>
  </select>
</TextField>




                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary" >
                                Cancel
                            </Button>

                            <Button
                                form="report-form"
                                type="submit"
                                isLoading={loading}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                {loading
                                    ? 'Submitting...'
                                    : 'Submit Report'}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default ReportModal;






