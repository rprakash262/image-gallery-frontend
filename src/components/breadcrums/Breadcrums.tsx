import { IconChevronRight } from "@tabler/icons-react";

interface BreadcrumsProps {
  steps: string[];
}

export const Breadcrums = ({ steps }: BreadcrumsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        height: "28px",
        alignItems: "center",
        padding: "0 15px",
        marginTop: "10px"
      }}
    >
      {steps.map((step, index) => (
        <>
        <h4 style={{ fontWeight: 400, textTransform: "capitalize" }}>{step}</h4>
        {steps[index + 1] && <IconChevronRight />}
        </>
      ))}
    </div>
  )
}