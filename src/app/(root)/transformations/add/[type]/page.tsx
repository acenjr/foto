import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { getUserById } from "@/lib/actions/user.actions";
import { transformationTypes } from "../../../../../../constants";

interface SearchParamProps {
  params: {
    type: string;
  };
}

interface TransformationType {
  title: string;
  subTitle: string;
  type: TransformationTypeKey;
}

type TransformationTypeKey = keyof typeof transformationTypes;

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const transformation = transformationTypes[type as TransformationTypeKey];

  // if (!transformation) {
  //   redirect("/"); // Redirect to home if invalid transformation type
  // }

  const user = await getUserById(userId);

  // if (!user) {
  //   redirect("/sign-in"); // Redirect if user not found
  // }

  return (
    <div className="flex flex-col gap-4">
      <Header title={transformation.title} subTitle={transformation.subTitle} />
      <TransformationForm
        action="Add"
        userId={user._id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </div>
  );
};

export default AddTransformationTypePage;
