interface ContaienrProsp{
    children: React.ReactNode;
}

const Cont: React.FC<ContaienrProsp>=({
    children
})=>{
    return(
        <div className="mx-auto max-w-7xl " >
            {children}
        </div>
    )
}
export default Cont;