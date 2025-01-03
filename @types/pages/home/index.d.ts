enum ETypeModal {
  Credential = 'credential',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete'
}

type TModalState = {
  type: ETypeModal | null;
  title: string;
  open: boolean;
};

type FieldPostType = {
  title?: string;
  body?: string;
};

type FieldCredType = {
  name: string;
  token: string;
};