export default function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></>,
    users: <><path d="M16 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 19.5V21"/><circle cx="9" cy="7" r="3"/><path d="M17 11a3 3 0 1 0 0-6"/><path d="M21.5 20.5v-1.2a4.3 4.3 0 0 0-3.2-4.1"/></>,
    heart: <><path d="M20.8 8.8c0 5.5-8.8 10.4-8.8 10.4S3.2 14.3 3.2 8.8A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.7Z"/></>,
    comment: <><path d="M20 11.5a7.2 7.2 0 0 1-7.7 7.1 8.9 8.9 0 0 1-3.5-.7L4 20l1.2-3.4a7.2 7.2 0 1 1 14.8-5.1Z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.5 4.5"/></>,
    settings: <><path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z"/><path d="M19 13.2a7.8 7.8 0 0 0 .1-1.2 7.8 7.8 0 0 0-.1-1.2l2-1.5-2-3.4-2.4 1a7.4 7.4 0 0 0-2-1.2L14.3 3h-4.1l-.3 2.7a7.4 7.4 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.5a7.8 7.8 0 0 0-.1 1.2 7.8 7.8 0 0 0 .1 1.2l-2 1.5 2 3.4 2.4-1a7.4 7.4 0 0 0 2 1.2l.3 2.7h4.1l.3-2.7a7.4 7.4 0 0 0 2-1.2l2.4 1 2-3.4-2-1.5Z"/></>,
    logout: <><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18"/></>,
    arrow: <><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></>,
    trash: <><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 14h10l1-14"/><path d="M9 7V4h6v3"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 16-5-5L5 20"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    edit: <><path d="M12 20h9"/><path d="m16.5 3.5 4 4L9 19l-4 1 1-4Z"/></>,
    spark: <><path d="m12 3 1.2 5.2L18 9.5l-4.8 1.3L12 16l-1.2-5.2L6 9.5l4.8-1.3Z"/><path d="m19 15 .6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6Z"/></>
  };
  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}
