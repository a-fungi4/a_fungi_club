"use client";

import React, { useState } from "react";
import Dropdown4 from "@/components/Dropdown4";
import ShezziProjectPageLogo from "@/components/icons/ShezziProjectPageLogo";

interface ShezziDropdownWrapperProps {
  content: React.ReactNode;
}

export default function ShezziDropdownWrapper({ content }: ShezziDropdownWrapperProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Dropdown4
      title="Capability Profile"
      options={[]}
      icon={<ShezziProjectPageLogo />}
      expanded={expanded}
      onExpand={() => setExpanded(true)}
      onCollapse={() => setExpanded(false)}
      additionalContent={content}
      hugContent={true}
    />
  );
}
