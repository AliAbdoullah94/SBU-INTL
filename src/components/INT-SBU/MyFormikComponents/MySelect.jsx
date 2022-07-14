import { useField } from "formik";

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name} >{label}</label>
            <select className="form-control"{...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="alert alert-warning">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MySelect;