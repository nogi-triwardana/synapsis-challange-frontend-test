"use client"

import { AtomButton } from "@/components/atoms";
import { Layout } from "@/components/templates";
import { usePostsDetail } from "@/hooks/queries";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function DetailPost() {
  const router = useRouter();

  const { postDetailData, postDetailIsLoading } = usePostsDetail(router.query.id);

  return (
    <Layout>
      {postDetailIsLoading ? (
        <div className="flex justify-center gap-2 items-center w-full p-4">
          <LoadingOutlined />
          <h1 className='text-gray-600 font-semibold'>Loading...</h1>
        </div>
      ) : (
        <>
          <h1 className='text-lg font-semibold'>{postDetailData?.title}</h1>
          <p className='font-medium'>
            {postDetailData?.body}
          </p>
        </>
      )}
      <div className='flex justify-start w-full'>
        <AtomButton
          type="primary"
          onClick={() => router.back()}
          data-test="back-button-detail-post"
        >
          Back
        </AtomButton>
      </div>
    </Layout>
  );
};