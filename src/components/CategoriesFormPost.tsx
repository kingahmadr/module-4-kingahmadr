import { CategoriesProps } from "../interface";
import { useFetchData } from "../modules/UseFetchData";
import { useFormik } from "formik";
import { CategoreisValidationScheme } from "../modules/ValidationSchema";
import tailwindStyles from "../scripts/constants/styles";
// import { useNavigate } from "react-router-dom";

interface CategoriesFormPostProps extends CategoriesProps {
  onClose?: () => void;
}
const CategoriesFormPost: React.FC<CategoriesFormPostProps> = ({
  name,
  description,
  onClose,
}) => {
  const { addCategories } = useFetchData();
  // const navigate = useNavigate();
  // const refreshPage = () => {
  //   navigate(0);
  // };

  const formik = useFormik<CategoriesProps>({
    initialValues: {
      name: name,
      description: description,
    },
    validationSchema: CategoreisValidationScheme,

    onSubmit: (values: CategoriesProps) => {
      addCategories(values.name, values.description);
      console.log(values);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <form
        className="relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        onSubmit={formik.handleSubmit}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        <div className="space-y-2">
          <label className="text-lg font-semibold text-gray-900" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className={tailwindStyles.errorText}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="text-lg font-semibold text-gray-900"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className={tailwindStyles.errorText}>
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <button
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Add Data
        </button>
      </form>
    </div>
  );
};

export default CategoriesFormPost;
