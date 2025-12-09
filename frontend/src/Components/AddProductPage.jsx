import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function AddProductPage(
  handleOnSubmit,
  handleOnChange,
  postResponse,
  formData
) {
  return (
    <div>
      <h1>Add A New Product</h1>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={false}
      />
      <br />
      <br />
      <br />
      <link to="/main">return to main page</link>
    </div>
  );
}
