import Button from "@/components/common/button";
import { Path } from "@/navigations/routes";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(Path.Products);
    }
  };

  return (
    <div className="mt-6 mb-4">
      <Button
        label="← Back to Products"
        onClick={handleBack}
        variant="primary-outline"
        className="!px-4 !py-2"
      />
    </div>
  );
};

export default BackButton;
