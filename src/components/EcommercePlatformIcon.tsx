import React from 'react';

const EcommercePlatformIcon: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }> = ({ title, ...props }) => (
  <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title} {...props}>
    {title ? <title>{title}</title> : null}
    <rect width="44" height="44" rx="4.5" fill="#151029" stroke="#2DA9E1" strokeWidth="1.69" />
    <g transform="translate(1 1)">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ...existing SVG paths... */}
        <path d="M12.4529 7.48946C12.4494 7.72185 12.3773 7.94802 12.2457 8.13956C12.114 8.33109 11.9287 8.47945 11.713 8.56597C11.4973 8.6525 11.2608 8.67334 11.0333 8.62587C10.8058 8.5784 10.5974 8.46475 10.4342 8.29919C10.2711 8.13363 10.1606 7.92355 10.1165 7.69535C10.0724 7.46715 10.0968 7.23102 10.1865 7.01662C10.2762 6.80222 10.4273 6.61913 10.6208 6.49035C10.8143 6.36157 11.0415 6.29285 11.2739 6.29283C11.5887 6.29609 11.8893 6.42378 12.1102 6.64799C12.3311 6.8722 12.4543 7.17471 12.4529 7.48946Z" fill="#C0282D"/>
        {/* ...rest of SVG... */}
      </svg>
    </g>
  </svg>
);

export default EcommercePlatformIcon; 