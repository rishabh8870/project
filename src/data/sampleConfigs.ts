export const sampleConfigs = {
  basic: [
    {
      "title": "Name",
      "name": "name",
      "placeholder": "Enter your name",
      "type": "text",
      "validator": "^[a-zA-Z ]{3,}$",
      "value": "",
      "required": true,
      "error": "Name must be at least 3 letters."
    },
    {
      "title": "Email",
      "name": "email",
      "placeholder": "you@example.com",
      "type": "email",
      "validator": "^[\\w.-]+@[\\w.-]+\\.\\w{2,4}$",
      "required": true,
      "value": "",
      "error": "Invalid email format."
    },
    {
      "title": "Age",
      "name": "age",
      "type": "number",
      "min": "18",
      "max": "99",
      "resolution": "1",
      "required": false,
      "value": "",
      "error": "Age must be between 18 and 99."
    }
  ],
  
  selectMultiselect: [
    {
      "title": "Primary Language",
      "name": "language",
      "type": "select",
      "data": [
        { "id": "js", "title": "JavaScript" },
        { "id": "py", "title": "Python" },
        { "id": "rb", "title": "Ruby" }
      ],
      "required": true,
      "value": "py",
      "error": "Please select a language."
    },
    {
      "title": "Technologies Known",
      "name": "tech_stack",
      "type": "multiselect",
      "data": [
        { "id": "react", "title": "React" },
        { "id": "vue", "title": "Vue" },
        { "id": "flutter", "title": "Flutter" }
      ],
      "required": false,
      "value": ["react"],
      "error": "Select at least one technology."
    }
  ],
  
  fileCard: [
    {
      "title": "Upload Profile Picture",
      "name": "profile_pic",
      "type": "file",
      "data": {
        "url": "https://upload.example.com/pic",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer sampleToken"
        }
      },
      "required": true,
      "error": "Profile picture is required."
    },
    {
      "title": "Education Details",
      "name": "education",
      "type": "card",
      "data": [
        {
          "title": "Institution",
          "name": "institution",
          "type": "text",
          "validator": "^.{3,}$",
          "required": true,
          "error": "Institution name is required."
        },
        {
          "title": "Start Year",
          "name": "start_year",
          "type": "date",
          "min": "2000-01-01",
          "max": "2025-12-31",
          "resolution": "1",
          "required": true,
          "error": "Enter valid start year."
        }
      ],
      "required": true,
      "error": "All education fields are mandatory."
    }
  ],
  
  complex: [
    {
      "title": "Personal Information",
      "name": "personal",
      "type": "card",
      "data": [
        {
          "title": "Full Name",
          "name": "full_name",
          "type": "text",
          "validator": "^[a-zA-Z ]{3,}$",
          "required": true,
          "error": "Full name is required."
        },
        {
          "title": "Gender",
          "name": "gender",
          "type": "buttons",
          "data": [
            { "id": "male", "title": "Male" },
            { "id": "female", "title": "Female" },
            { "id": "other", "title": "Other" }
          ],
          "required": true,
          "error": "Please select gender."
        },
        {
          "title": "Birth Date",
          "name": "birth_date",
          "type": "date",
          "min": "1950-01-01",
          "max": "2010-12-31",
          "required": true,
          "error": "Birth date is required."
        }
      ],
      "required": true,
      "error": "Personal information is required."
    },
    {
      "title": "Contact Information",
      "name": "contact",
      "type": "card",
      "data": [
        {
          "title": "Email Address",
          "name": "email",
          "type": "email",
          "validator": "^[\\w.-]+@[\\w.-]+\\.\\w{2,4}$",
          "required": true,
          "error": "Valid email is required."
        },
        {
          "title": "Phone Number",
          "name": "phone",
          "type": "tel",
          "validator": "^\\+?[1-9]\\d{1,14}$",
          "required": true,
          "error": "Valid phone number is required."
        },
        {
          "title": "Country",
          "name": "country",
          "type": "typeahead",
          "data": [
            { "id": "us", "title": "United States" },
            { "id": "uk", "title": "United Kingdom" },
            { "id": "ca", "title": "Canada" },
            { "id": "au", "title": "Australia" },
            { "id": "in", "title": "India" }
          ],
          "required": true,
          "error": "Please select a country."
        }
      ],
      "required": true,
      "error": "Contact information is required."
    },
    {
      "title": "Additional Information",
      "name": "additional",
      "type": "textarea",
      "placeholder": "Tell us more about yourself...",
      "required": false,
      "error": "Additional information is invalid."
    }
  ]
};