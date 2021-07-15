export enum BoxSizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
  long = 'long',
}

export default interface PropsWithChildren {
  children: React.ReactNode;
}

export default interface IBoxSizeProps {
  size: BoxSizes;
}
