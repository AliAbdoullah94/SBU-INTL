import { useField } from "formik";

const MyTextArea = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-control" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="alert alert-warning">{meta.error}</div>
            ) : null}
        </>
    );
};

export default MyTextArea;