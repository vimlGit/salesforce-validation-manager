import { useEffect, useState } from "react";
import axios from "axios";

const CLIENT_ID = "3MVG97L7PWbPq6UyADfwaNnE1ZyCM8oWYH7u_t2SqlmAoTrfReM63xq5KzTY.FlC_.BVqrJqcdEl6eeScDqyk";
const REDIRECT_URI = "http://localhost:5173";

function App() {
  const [token, setToken] = useState("");
  const [instanceUrl, setInstanceUrl] = useState("");
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));

      const accessToken = params.get("access_token");
      const instance = params.get("instance_url");

      if (accessToken) {
        setToken(accessToken);
        setInstanceUrl(instance);

        localStorage.setItem("token", accessToken);
        localStorage.setItem("instanceUrl", instance);
      }
    } else {
      const savedToken = localStorage.getItem("token");
      const savedInstance = localStorage.getItem("instanceUrl");

      if (savedToken) {
        setToken(savedToken);
        setInstanceUrl(savedInstance);
      }
    }
  }, []);

  const loginToSalesforce = () => {
    window.location.href =
      `https://login.salesforce.com/services/oauth2/authorize` +
      `?response_type=token` +
      `&client_id=${CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}`;
  };

  const getValidationRules = async () => {

  try {

    const response = await axios.get(
      "https://salesforce-backend-f15c.onrender.com/api/rules",
      {
        params: {
          token: token,
          instanceUrl: instanceUrl
        }
      }
    );

    console.log(response.data);

    const parsed =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;

    setRules(parsed.records);

  } catch (error) {

    console.error(error);

    alert("Failed to fetch validation rules");
  }
};


const toggleRule = async (rule) => {
  try {
    await axios.patch(
      "http://localhost:8080/api/toggleRule",
      {
        token: token,
        instanceUrl: instanceUrl,
        ruleId: rule.Id,
        active: !rule.Active
      }
    );

    alert("Rule Updated");

    getValidationRules();

  } catch (error) {

    console.error(error);

    alert("Failed to update rule");
  }
};


  return (
    <div style={{ padding: "30px" }}>
      <h1>Salesforce Validation Rule Manager</h1>

      {!token ? (
        <button onClick={loginToSalesforce}>
          Login with Salesforce
        </button>
      ) : (
        <>
          <h3>Logged in Successfully</h3>

          <button onClick={getValidationRules}>
            Get Validation Rules
          </button>

          <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Status</th>
                 <th>Action</th>
              </tr>
            </thead>

           <tbody>
  {rules.map((rule) => (
    <tr key={rule.Id}>
      <td>{rule.ValidationName}</td>

      <td>
        {rule.Active ? "Active" : "Inactive"}
      </td>

      <td>
        <button
          onClick={() => toggleRule(rule)}
        >
          Toggle
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;