import React from "react";
import styles from "./SkillPillCont.module.css";

interface SkillPillContProps {
  projectType: string;
  skills: string[];
}

const SkillPillCont: React.FC<SkillPillContProps> = ({ projectType, skills }) => {
  return (
    <div className={styles.Skillpillcontainer}>
      <div className={styles.ProjectTypePill}>
        <div className={styles.ProjectTypeText}>{projectType}</div>
      </div>
      <div className={styles.Bannerskillsection}>
        {skills.map((skill, idx) => (
          <div className={styles.SkillPill} key={idx}>
            <div className={styles.SkillText}>{skill}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillPillCont; 