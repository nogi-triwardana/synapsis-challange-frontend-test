"use client"

import { useCallback, useContext, useEffect, useState } from 'react';
import { Dropdown, Form, FormProps, MenuProps, notification } from 'antd';
import { ConfirmModal, FormModal } from '@/components/molecules';
import { AtomButton, AtomInput, Pagination, TextArea } from '@/components/atoms';
import { usePostsList, useUsersList } from '@/hooks/queries';
import { DeleteOutlined, EditFilled, InfoCircleFilled, SearchOutlined, PlusOutlined, LoadingOutlined, FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { postCreateService, postDeleteService, postUpdateService } from '@/services';
import { Layout } from '@/components/templates';
import CredentialContext, { TCredentialContext } from '@/providers/CredentialProvider';
import Cookies from 'js-cookie';
import { debounce, isNaN } from 'lodash';

enum ETypeModal {
  Credential = 'credential',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete'
}

export default function Home() {
  const [modal, setModal] = useState<TModalState>({
    type: null,
    title: '',
    open: false
  });
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [formPostValues] = useState<FieldPostType>({
    title: '',
    body: ''
  });
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [keyword, setKeyword] = useState('');
  const [filterBy, setFilterBy] = useState<'title' | 'body'>('title');
  const [ api, contextHolder ] = notification.useNotification();
  const postForm = Form.useForm();
  const router = useRouter();
  const { setIsAccessToken } = useContext(CredentialContext) as TCredentialContext;

  const params = {
    page: page,
    per_page: limit,
    [filterBy]: keyword
  };

  const { 
    postsData, 
    postRefetch, 
    postPagination, 
    postIsLoading, 
    postError, 
  } =  usePostsList(params);

  const { usersData } = useUsersList({}, { enabled: true });

  const filterItems: MenuProps['items'] = [
    {
      key: '1',
      onClick: () => setFilterBy('title'),
      label: (
        <div className={`${filterBy === 'title' ? 'text-[#36a2b5]' : ''}`}>
          Search by title
        </div>
      ),
    },
    {
      key: '2',
      onClick: () => setFilterBy('body'),
      label: (
        <div className={`${filterBy === 'body' ? 'text-[#36a2b5]' : ''}`}>
          Search by body
        </div>
      ),
    },
  ];

  const handleChangeModal = (type: ETypeModal | null, title: string) => {
    setModal((curr) => ({
      ...curr,
      type: type,
      title: title,
      open: !curr.open
    }));
  };

  const handleEditPostModal = (post: { id: number } & FieldPostType) => {
    setSelectedPost(post.id);
    postForm[0].setFieldsValue({ title: post.title, body: post.body });
    handleChangeModal(ETypeModal.Edit, 'Edit Post');
  };

  const handleDeletePost = (data: any) => {
    setSelectedPost(data?.id);
    handleChangeModal(ETypeModal.Delete, 'Delete Post');
  };

  const handleCloseModal = () => {
    postForm[0].setFieldsValue({ title: '', body: '' });
    setModal({ title: '', type: null, open: false })
  };

  const createPostMutation = useMutation({
    mutationFn: postCreateService,
    onSuccess: (res) => {

      handleCloseModal();
      
      api.success({
        message: 'Create new post success',
        placement: 'top'
      });

      postRefetch();
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: postUpdateService,
    onSuccess: (res) => {
      
      handleCloseModal();
      
      api.success({
        message: 'Edit post success',
        placement: 'top'
      });

      postRefetch();
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: postDeleteService,
    onSuccess: (res) => {

      handleCloseModal();
      
      api.success({
        message: 'Delete post success',
        placement: 'top'
      });

      postRefetch();
    }
  });

  const onDeletePost = () => {
    deletePostMutation.mutate(selectedPost);
  };

  const handleCreatePost: FormProps<FieldPostType>["onFinish"] = (payload) => {
    // get a user data as sample to create post
    let user = usersData.length > 0 ? usersData[0] : null;

    if(user) {
      createPostMutation.mutate({ payload, user });
    } else {
      api.error({
        message: 'You need a user to create a post',
        placement: 'top'
      });
    }
  };

  const handleEditPost: FormProps<FieldPostType>["onFinish"] = (payload) => {
    updatePostMutation.mutate({ payload: payload, id: selectedPost });
  };

  const onSearch = debounce(
    useCallback(
      async (event) => {
        setKeyword(() => {
          if(event.target.value) return event.target.value;
          return undefined;
        });
      },
      []
    ),
    1000
  );

  useEffect(() => {
    postRefetch();

    return () => {
      onSearch.cancel();
    };
  }, [keyword, page, limit]);

  useEffect(() => {
    if(postError?.status === 401) {
      api.error({
        message: postError?.response?.data?.message ?? 'Invalid token',
        placement: 'top'
      });
    }
  }, [postError]);

  return (
    <Layout>
      {contextHolder}
      <div className='flex gap-2 items-center'>
        <AtomInput
          prefix={<SearchOutlined />}
          onChange={onSearch}
          data-test="post-search-bar"
          value={keyword}
          {...(keyword !== "" && {
            suffix: <CloseOutlined onClick={() => setKeyword("")} />
          })}
        />
        <Dropdown menu={{ items: filterItems }}>
          <AtomButton
            icon={<FilterOutlined />}
          />
        </Dropdown>
        <AtomButton
          type="primary"
          icon={<PlusOutlined />}
          data-test="create-post"
          onClick={() => handleChangeModal(ETypeModal.Create, 'Create Post')}
        />
      </div>
      <div 
        data-test={'posts-list'}
        className='flex flex-col gap-2 p-4 sm:p-8 overflow-auto h-[calc(100vh-180px)]'
      >
        {postIsLoading ? (
          <div className="flex justify-center gap-2 items-center w-full p-4">
            <LoadingOutlined />
            <h1 className='text-gray-600 font-semibold'>Loading...</h1>
          </div>
        ) : (
          postsData.map((post: any, key: number) => (
            <div 
              key={'post-' + key}
              className='flex justify-between gap-2 w-full p-2 border border-gray-400 rounded-lg'
            >
              <div className='flex flex-col w-full'>
                <h1 
                  data-test={`post-title-${key}`}
                  className='text-gray-600 font-semibold text-base sm:text-lg'
                >
                  {post.title}
                </h1>
                <p 
                  data-test={`post-body-${key}`}
                  className='text-gray-600 text-sm sm:text-base text-ellipsis overflow-hidden w-full line-clamp-2'
                >
                  {post.body}
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <AtomButton 
                  color="primary" 
                  variant="solid" 
                  icon={<InfoCircleFilled />}
                  onClick={() => router.push(`/post/${post.id}`)}
                  data-test={`post-detail-${key}`}
                >
                  Detail
                </AtomButton>
                <AtomButton 
                  className='!bg-yellow-500 !text-white' 
                  variant="solid" 
                  icon={<EditFilled />}
                  onClick={() => handleEditPostModal(post)}
                  data-test={`post-edit-${key}`}
                >
                  Edit
                </AtomButton>
                <AtomButton 
                  color="danger" 
                  variant="solid" 
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeletePost(post)}
                  data-test={`post-delete-${key}`}
                >
                  Delete
                </AtomButton>
              </div>
            </div>
          ))
        )}
      </div>
      {(!isNaN(postPagination.page) || 
        !isNaN(postPagination.total) || 
        !isNaN(postPagination.limit)) && (
        <div className="flex justify-center w-full">
          <Pagination
            defaultCurrent={postPagination.page}
            total={postPagination.total}
            pageSize={postPagination.limit}
            className='text-xs sm:text-sm'
            onChange={(page, pageSize) => { 
              setPage(page); 
              setLimit(pageSize); 
            }}
          />
        </div>
      )}

      {/** Form Post Modal */}
      <FormModal
        open={modal.open && (modal.type === ETypeModal.Create || modal.type === ETypeModal.Edit)}
        title={modal.title}
        onCancel={handleCloseModal}
        onFinish={modal.type === ETypeModal.Create ? handleCreatePost : handleEditPost}
        form={postForm[0]}
        initialValues={formPostValues}
        loading={modal.type === ETypeModal.Create ? createPostMutation.isPending : updatePostMutation.isPending}
      >
        <Form.Item<FieldPostType> 
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title' }]}
          data-test="form-field-title"
        >
          <AtomInput className="w-full" />
        </Form.Item>
        <Form.Item<FieldPostType> 
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please input body' }]}
          data-test="form-field-body"
        >
          <TextArea 
            rows={5}
          />
        </Form.Item>
      </FormModal>

      {/** Confirmation modal */}
      <ConfirmModal
        open={modal.open && modal.type === ETypeModal.Delete}
        title={modal.title}
        onOk={onDeletePost}
        onCancel={handleCloseModal}
        loading={deletePostMutation.isPending}
      >
        <h1>Are you sure want to delete this data?</h1>
      </ConfirmModal>
    </Layout>
  )
}
