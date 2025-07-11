import React from 'react';

const PrintfullLogoIcon: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }> = ({ title, ...props }) => (
  <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title} {...props}>
    {title ? <title>{title}</title> : null}
    <rect width="44" height="44" rx="4.5" fill="#151029" stroke="#2DA9E1" strokeWidth="1.69" />
    <g transform="translate(1 1)">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ...existing SVG paths... */}
        <path d="M1 28.09H3.68344C3.96855 28.0816 4.26205 28.1487 4.51362 28.2829C4.76519 28.3919 4.98322 28.5596 5.15094 28.7777C5.31865 28.9957 5.48637 29.2221 5.56184 29.4653C5.67085 29.7085 5.72955 29.9768 5.72955 30.2368C5.72955 30.5135 5.67924 30.7818 5.587 31.0418C5.48637 31.2934 5.34381 31.5282 5.1761 31.7294C5 31.9307 4.78197 32.09 4.53878 32.199C4.27882 32.3164 3.99371 32.3668 3.70859 32.3668H2.43396V34.4129H1V28.09ZM3.65828 31.1089C3.83438 31.1089 3.99371 31.025 4.10272 30.8909C4.24528 30.7567 4.29559 30.5303 4.29559 30.2535C4.29559 30.1194 4.27044 29.9936 4.23689 29.8678C4.21174 29.7588 4.15304 29.6665 4.06918 29.5911C4.01048 29.5072 3.92662 29.4821 3.84276 29.4234C3.76729 29.3814 3.67505 29.3563 3.59119 29.3647H2.45912V31.1089H3.65828Z" fill="white"/>
        {/* ...rest of SVG... */}
      </svg>
    </g>
  </svg>
);

export default PrintfullLogoIcon; 