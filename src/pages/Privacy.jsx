import Navbar from "../components/Navbar";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Privacy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="h-16 flex items-center pl-12 flex-col justify-center"></div>
        <div className="p-4 sm:ml-64">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold sm:text-start text-center">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-300 sm:text-start text-center">
              We take our user privacy very seriously.
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What information do we collect?
                </AccordionTrigger>
                <AccordionContent>
                  Our website is designed to offer the convenience of managing
                  calendar events without compromising user privacy. We do not
                  collect any personal information from your Google Calendar.
                  The only data we access is the minimal information necessary
                  to create calendar events as per your instructions. This
                  includes the date, time, and title of the events you choose to
                  create through our platform. No other details from your
                  calendar are accessed or stored.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How We Use Your Information</AccordionTrigger>
                <AccordionContent>
                  The information accessed is used solely for the purpose of
                  creating calendar events on your Google Calendar. We do not
                  use this data for any other purpose. There is no aggregation,
                  analysis, or sharing of your event details with third parties.
                  Our use of your information is limited to the functionality of
                  event creation, ensuring a straightforward and secure
                  experience.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Our Commitment to Data Privacy
                </AccordionTrigger>
                <AccordionContent>
                  We are deeply committed to protecting your privacy. Our
                  integration with the Google Calendar API is implemented with
                  the highest standards of security and data protection. We
                  regularly update our systems and practices to ensure that your
                  information remains secure and private. Our platform operates
                  with a privacy-first approach, ensuring that your calendar
                  management is efficient, secure, and private.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  User Control and Transparency
                </AccordionTrigger>
                <AccordionContent>
                  You have full control over the information you provide to our
                  website. At any time, you can choose to stop using our
                  service, and we assure you that no data will be retained on
                  our servers. We believe in complete transparency and are
                  always available to answer any queries or concerns regarding
                  how we handle your data.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
