import React, { useState } from "react";
import { Button, Stack, Typography, Box } from "@mui/material";
import { server } from "@/config";
import { useSession } from "next-auth/react";
import { displayToastSuccess, warningOnError } from "@/utils";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { light, darkGrey } from "@/constants";
import { styled } from "@mui/material/styles";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const AIButtonSize = "37px";
const addButtonSize = "32px";

interface IAIButton {
  text: string;
  setResult: (text: string) => void;
}

type ExtraAIButtonProps = {
  isImproved?: boolean;
};

const StyledButton = styled(Button)<ExtraAIButtonProps>(({ isImproved }) => ({
  position: "absolute",
  width: AIButtonSize,
  minWidth: AIButtonSize,
  height: AIButtonSize,
  borderRadius: "50%",
  right: "-5px",
  top: "-18px",
  boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.5)",
  ...(isImproved && {
    background: light,
    color: darkGrey,
    "&:hover": {
      backgroundColor: light,
      boxShadow: "inset 0px 10px 20px 2px rgba(0, 0, 0, 0.25)",
    },
  }),
}));

const StyledAddButton = styled(Button)<ExtraAIButtonProps>({
  position: "absolute",
  width: addButtonSize,
  minWidth: addButtonSize,
  height: addButtonSize,
  borderRadius: "50%",
  right: "33px",
  top: "-14px",
  boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.5)",
  background: light,
  color: darkGrey,
  "&:hover": {
    backgroundColor: light,
    boxShadow: "inset 0px 10px 20px 2px rgba(0, 0, 0, 0.25)",
  },
});

const AIButton = ({ text, setResult }: IAIButton) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [improvement, setImprovement] = useState<string>("");

  const tooltipText = improvement ? (
    <>
      <Typography sx={{ mb: 1 }} align="center">
        Suggested text:
      </Typography>{" "}
      <Box sx={{ mb: 1 }}> {improvement}</Box>
    </>
  ) : (
    "Click the button to get enhanced text (from 50 characters)"
  );

  const { data: session } = useSession();
  const token = session?.user?.token;

  const getAITextImprovement = async () => {
    if (isLoading || !text) return;
    setIsLoading(true);

    const apiUrl = `${server}/api/chat`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: text }),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const { data } = await response.json();
        setImprovement(data);
        displayToastSuccess("Hover the button to see the result");
        setIsLoading(false);
      } else {
        warningOnError("Try later");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      warningOnError(error.message);
    }
  };

  return (
    <>
      <Tooltip placement="right" title={tooltipText} sx={{ fontSize: "16px" }}>
        <StyledButton
          isImproved={!!improvement}
          variant="contained"
          onClick={getAITextImprovement}
        >
          {isLoading ? (
            <Image src="/spinner.gif" alt="spinner" width={30} height={30} />
          ) : (
            "AI"
          )}
        </StyledButton>
      </Tooltip>
      {improvement && (
        <Tooltip placement="top" title="use suggested text">
          <StyledAddButton
            variant="contained"
            onClick={() => setResult(improvement)}
          >
            <ControlPointIcon />
          </StyledAddButton>
        </Tooltip>
      )}
    </>
  );
};

export default AIButton;
