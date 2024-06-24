import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { languages, screens, time } from "../../constants/SelectOptions";
import { useAppContext } from "../../context/AppContext";
import useHeaders from "../../hooks/useHeaders";
import ShowtimeProps, {
  ScreenProps,
  TimeProps,
} from "../../props/ShowtimeProps";
import FormLayout from "../shared/FormLayout";
import ScreenModal from "../shared/ScreenModal";
import SelectInputField from "../shared/SelectInputField";
import DateInputField from "./DateInputField";
import ValidateShowtimeData from "../../libs/ValidateShowtimeData";
import formatDateInDMY from "../../libs/FormatDateInDMY";

// Empty show to initiate a show object
const emptyShow: ShowtimeProps = {
  time: "10:00 AM",
  date: formatDateInDMY(new Date()),
  language: "",
  screen: "Screen 1",
  movie: {
    _id: "",
    title: "",
  },
};

// Props
interface AddShowTimeModal {
  closeModal: () => void;
}

const AddShowTimeModal: React.FC<AddShowTimeModal> = ({ closeModal }) => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState<ShowtimeProps>(emptyShow);

  // Hooks
  // Destructuring from app context
  const { allMovies, AddShowtime } = useAppContext();
  const [searchParams, _] = useSearchParams();
  const headers = useHeaders();

  // Function to update time
  const changeTime = (time: string) =>
    setShow((prev) => ({ ...prev, time: time as TimeProps }));

  // Function to change screen
  const changeScreen = (screen: string) =>
    setShow((prev) => ({ ...prev, screen: screen as ScreenProps }));

  // Function to change langauge
  const changeLanguage = (language: string) =>
    setShow((prev) => ({ ...prev, language: language as string }));

  // Function to chage date
  const changeDate = (date: string) => {
    const selectedDate = new Date(date);
    setShow((prev) => ({ ...prev, date: formatDateInDMY(selectedDate) }));
  };

  // Function to change movie
  const changeMovie = (id: string) => {
    if (allMovies) {
      const index = allMovies.findIndex((movie) => movie._id === id);
      const selectedMovie = allMovies[index];
      if (index > -1) {
        setShow((prev) => ({
          ...prev,
          movie: {
            _id: selectedMovie._id!,
            title: selectedMovie.title,
          },
        }));
      }
    }
  };

  // Function to save show in DB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Validating show data
      const isValid = ValidateShowtimeData(show);
      if (!isValid) {
        toast.error("Please fill all fields");
        return;
      }

      // API CALL
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/showtimes/add`,
        {
          ...show,
        },
        {
          headers,
        }
      );

      // If selected date is date of show added then it will also be added in showtimes array
      const selectedDate = searchParams.get("date");
      if (selectedDate && selectedDate === show.date) {
        AddShowtime(res.data.showtime);
      }

      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenModal closeModal={closeModal} isForm showCancel>
      <FormLayout
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        variant="ADD SHOWTIME"
      >
        {/* DATE INPUT FIELD */}
        <DateInputField onChange={changeDate} />

        <SelectInputField id="TIME" options={time} onChange={changeTime} />

        <SelectInputField
          id="SCREEN"
          options={screens}
          onChange={changeScreen}
        />
        <SelectInputField
          id="MOVIE"
          options={allMovies || []}
          onChange={changeMovie}
        />
        <SelectInputField
          id="LANGUAGE"
          options={languages}
          onChange={changeLanguage}
        />
      </FormLayout>
    </ScreenModal>
  );
};

export default AddShowTimeModal;
