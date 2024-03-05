import * as Yup from "yup";

const UserIdNameSchema = Yup.object().shape({
  userIdName: Yup.string()
    .min(3, "minimum three latters numbers are required")
    .required("required")
    .matches(/^[a-zA-Z0-9]/, "user name should start with letters or numbers")
    .matches(
      /^[a-z0-9]([a-z0-9]*_{0,1}[a-z0-9]+_{0,1})$/,
      "user name can only use letters, numbers and one uderscore"
    ),
});

export default UserIdNameSchema;
