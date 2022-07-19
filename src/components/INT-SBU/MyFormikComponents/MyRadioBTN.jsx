import { useField } from "formik";

const MyRadioBTN = ({ children, ...props }) => {
    
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="radio-input">
                <input type="radio" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="alert alert-warning">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MyRadioBTN;