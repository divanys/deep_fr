import { CurrentDate } from "../CurrentDate";
import  GradesAccordion  from "../GradesAccordion";

const GradesTab = () => (
  <main className="py-8">
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <CurrentDate />
    </div>
    <GradesAccordion />
  </main>
);

export default GradesTab;
