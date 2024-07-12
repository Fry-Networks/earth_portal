
const AppKeyInput = ({
  appKey,
  setAppKey,
  disappear,
}: {
  appKey: string;
  setAppKey: Function;
  disappear: boolean;
}) => (
  <input
    type="text"
    value={appKey}
    autoComplete="off"
    data-lpignore="true"
    data-form-type="other"
    onChange={(e) => {
      setAppKey(e.target.value);
    }}
    placeholder="Enter your App Key"
    style={keyInputStyle}
    className={disappear ? "fade-out" : ""}
  />
);

const keyInputStyle = {
  color: "black",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
};

export default AppKeyInput;
