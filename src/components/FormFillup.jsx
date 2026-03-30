import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFormFillupData, submitFormFillup } from "../api/formFillupApi";
import { useAuth } from "../contexts/AuthContext";
import extractError from "../utils/extractError";
import "../css/FormFillup.css";

const STUDENT_FIELDS = {
  name: "",
  phone: "",
  date_of_birth: "",
  father_name: "",
  father_phone: "",
  mother_name: "",
  guardian: "",
  guardian_phone: "",
  current_address: "",
  permanent_address: "",
  same_as_current: false,
};

const TEACHER_FIELDS = {
  name: "",
  phone: "",
  gender: "",
  date_of_birth: "",
  father_name: "",
  father_phone: "",
  mother_name: "",
  mother_phone: "",
  current_address: "",
  permanent_address: "",
  same_as_current: false,
  highest_qualification: "",
  other_qualification: "",
  subject_specialization: "",
  teaching_experience_years: 0,
  previous_institution: "",
};

const QUALIFICATION_OPTIONS = [
  { value: "high_school", label: "High School" },
  { value: "intermediate", label: "Intermediate" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "Ph.D." },
  { value: "bed", label: "B.Ed." },
  { value: "med", label: "M.Ed." },
  { value: "diploma", label: "Diploma" },
  { value: "other", label: "Other" },
];

const FormFillup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bootstrap } = useAuth();

  const isOnboarding = location.state?.onboarding === true;

  const [formType, setFormType] = useState(null);
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFormFillupData();
        const { form_type, email: userEmail, ...fields } = res.data;

        setFormType(form_type);
        setEmail(userEmail);

        const defaults = form_type === "teacher" ? TEACHER_FIELDS : STUDENT_FIELDS;
        const merged = { ...defaults };

        for (const key of Object.keys(defaults)) {
          if (fields[key] !== null && fields[key] !== undefined && fields[key] !== "") {
            merged[key] = fields[key];
          }
        }

        setForm(merged);
      } catch (err) {
        const raw = extractError(err);
        const msg = raw instanceof Error ? raw.message : typeof raw === "string" ? raw : "Failed to load form data.";
        setFetchError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setForm((prev) => {
      const updated = { ...prev, [name]: val };

      if (name === "same_as_current" && checked) {
        updated.permanent_address = prev.current_address;
      }
      if (name === "current_address" && prev.same_as_current) {
        updated.permanent_address = value;
      }

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.name?.trim()) errs.name = "Full name is required";
    if (!form.phone?.trim()) errs.phone = "Phone number is required";
    if (!form.date_of_birth) errs.date_of_birth = "Date of birth is required";
    if (!form.father_name?.trim()) errs.father_name = "Father's name is required";
    if (!form.mother_name?.trim()) errs.mother_name = "Mother's name is required";
    if (!form.current_address?.trim()) errs.current_address = "Current address is required";

    if (!form.same_as_current && !form.permanent_address?.trim()) {
      errs.permanent_address = "Permanent address is required";
    }

    if (formType === "teacher") {
      if (!form.gender) errs.gender = "Gender is required";
      if (!form.highest_qualification) errs.highest_qualification = "Qualification is required";
      if (form.highest_qualification === "other" && !form.other_qualification?.trim()) {
        errs.other_qualification = "Please specify your qualification";
      }
      if (!form.subject_specialization?.trim()) {
        errs.subject_specialization = "Subject specialization is required";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      const payload = { ...form };

      if (formType === "teacher") {
        payload.teaching_experience_years = Number(payload.teaching_experience_years) || 0;
      }

      await submitFormFillup(payload);
      await bootstrap();

      if (isOnboarding) {
        navigate("/dashboard", { replace: true });
      } else {
        setSuccess("Profile updated successfully!");
      }
    } catch (err) {
      const raw = extractError(err);
      const msg = raw instanceof Error ? raw.message : typeof raw === "string" ? raw : "Failed to save. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="ff-container">
        <div className="ff-card">
          <p className="ff-loading">Loading form...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="ff-container">
        <div className="ff-card">
          <p className="ff-error-msg">{fetchError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ff-container">
      <div className="ff-card">
        <h2>{isOnboarding ? "Complete Your Profile" : "Update Profile"}</h2>
        <p className="ff-subtitle">
          {isOnboarding
            ? "Please fill in your details to get started."
            : `${formType === "teacher" ? "Teacher" : "Student"} Form`}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* ===== PERSONAL INFO ===== */}
          <h3 className="ff-section-title">Personal Information</h3>

          <div className="ff-field">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="ff-field-error">{errors.name}</span>}
          </div>

          <div className="ff-field">
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>

          <div className="ff-field">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="ff-field-error">{errors.phone}</span>}
          </div>

          {formType === "teacher" && (
            <div className="ff-field">
              <label>Gender *</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="ff-field-error">{errors.gender}</span>}
            </div>
          )}

          <div className="ff-field">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth || ""}
              onChange={handleChange}
            />
            {errors.date_of_birth && (
              <span className="ff-field-error">{errors.date_of_birth}</span>
            )}
          </div>

          {/* ===== FAMILY INFO ===== */}
          <h3 className="ff-section-title">Family Information</h3>

          <div className="ff-row">
            <div className="ff-field">
              <label>Father's Name *</label>
              <input
                type="text"
                name="father_name"
                value={form.father_name}
                onChange={handleChange}
                placeholder="Father's name"
              />
              {errors.father_name && (
                <span className="ff-field-error">{errors.father_name}</span>
              )}
            </div>

            <div className="ff-field">
              <label>Father's Phone</label>
              <input
                type="tel"
                name="father_phone"
                value={form.father_phone}
                onChange={handleChange}
                placeholder="Father's phone"
              />
            </div>
          </div>

          <div className="ff-row">
            <div className="ff-field">
              <label>Mother's Name *</label>
              <input
                type="text"
                name="mother_name"
                value={form.mother_name}
                onChange={handleChange}
                placeholder="Mother's name"
              />
              {errors.mother_name && (
                <span className="ff-field-error">{errors.mother_name}</span>
              )}
            </div>

            <div className="ff-field">
              <label>{formType === "teacher" ? "Mother's Phone" : "Guardian"}</label>
              {formType === "teacher" ? (
                <input
                  type="tel"
                  name="mother_phone"
                  value={form.mother_phone}
                  onChange={handleChange}
                  placeholder="Mother's phone"
                />
              ) : (
                <input
                  type="text"
                  name="guardian"
                  value={form.guardian}
                  onChange={handleChange}
                  placeholder="Guardian name"
                />
              )}
            </div>
          </div>

          {formType !== "teacher" && (
            <div className="ff-field">
              <label>Guardian's Phone</label>
              <input
                type="tel"
                name="guardian_phone"
                value={form.guardian_phone}
                onChange={handleChange}
                placeholder="Guardian's phone"
              />
            </div>
          )}

          {/* ===== ADDRESS ===== */}
          <h3 className="ff-section-title">Address Information</h3>

          <div className="ff-field">
            <label>Current Address *</label>
            <textarea
              name="current_address"
              value={form.current_address}
              onChange={handleChange}
              placeholder="Enter current address"
              rows={3}
            />
            {errors.current_address && (
              <span className="ff-field-error">{errors.current_address}</span>
            )}
          </div>

          <div className="ff-checkbox-row">
            <input
              type="checkbox"
              id="same_as_current"
              name="same_as_current"
              checked={form.same_as_current}
              onChange={handleChange}
            />
            <label htmlFor="same_as_current">
              Permanent address is same as current address
            </label>
          </div>

          {!form.same_as_current && (
            <div className="ff-field">
              <label>Permanent Address *</label>
              <textarea
                name="permanent_address"
                value={form.permanent_address}
                onChange={handleChange}
                placeholder="Enter permanent address"
                rows={3}
              />
              {errors.permanent_address && (
                <span className="ff-field-error">{errors.permanent_address}</span>
              )}
            </div>
          )}

          {/* ===== PROFESSIONAL (TEACHER ONLY) ===== */}
          {formType === "teacher" && (
            <>
              <h3 className="ff-section-title">Professional Information</h3>

              <div className="ff-field">
                <label>Highest Qualification *</label>
                <select
                  name="highest_qualification"
                  value={form.highest_qualification}
                  onChange={handleChange}
                >
                  <option value="">Select Qualification</option>
                  {QUALIFICATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.highest_qualification && (
                  <span className="ff-field-error">{errors.highest_qualification}</span>
                )}
              </div>

              {form.highest_qualification === "other" && (
                <div className="ff-field">
                  <label>Specify Qualification *</label>
                  <input
                    type="text"
                    name="other_qualification"
                    value={form.other_qualification}
                    onChange={handleChange}
                    placeholder="Enter your qualification"
                  />
                  {errors.other_qualification && (
                    <span className="ff-field-error">{errors.other_qualification}</span>
                  )}
                </div>
              )}

              <div className="ff-field">
                <label>Subject Specialization *</label>
                <input
                  type="text"
                  name="subject_specialization"
                  value={form.subject_specialization}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics, Physics"
                />
                {errors.subject_specialization && (
                  <span className="ff-field-error">{errors.subject_specialization}</span>
                )}
              </div>

              <div className="ff-row">
                <div className="ff-field">
                  <label>Teaching Experience (Years)</label>
                  <input
                    type="number"
                    name="teaching_experience_years"
                    value={form.teaching_experience_years}
                    onChange={handleChange}
                    min={0}
                  />
                </div>

                <div className="ff-field">
                  <label>Previous Institution</label>
                  <input
                    type="text"
                    name="previous_institution"
                    value={form.previous_institution}
                    onChange={handleChange}
                    placeholder="Previous institution name"
                  />
                </div>
              </div>
            </>
          )}

          {/* ===== SUBMIT ===== */}
          {errors.submit && <p className="ff-error-msg">{errors.submit}</p>}
          {success && <p className="ff-success-msg">{success}</p>}

          <div className="ff-actions">
            {!isOnboarding && (
              <button
                type="button"
                className="ff-btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            )}

            <button type="submit" className="ff-btn-primary" disabled={submitting}>
              {submitting
                ? "Saving..."
                : isOnboarding
                ? "Complete Profile"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormFillup;
