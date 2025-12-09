import { useNavigate } from "react-router-dom";
import { Axios } from "axios";
export default function EditProductPage(
  handleOnSubmit,
  handleOnChange,
  formData,
  postResponse,
  isEditing
) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={true}
      />
      <br />
      <br />
      <br />
      <link to="/main">return to main page</link>
    </div>
  );
}
