import { Title, TitleProps } from "@mantine/core";

type HeaderProps = TitleProps;

export function Header(props: HeaderProps) {
  return <Title {...props} />;
}
