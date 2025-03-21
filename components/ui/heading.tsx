interface HeadingProps{
    title: string,
    description: string,
};

const heading:React.FC<HeadingProps> = ({
    title,
    description
}) => {
  return (
    <div>
        <h2 className="text-3xl font-bold dark:text-white/90 tracking-tight " >{title}</h2>
        <p className="text-sm text-muted-foreground " >
            {description}
        </p>
    </div>
  )
}

export default heading