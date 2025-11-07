
export default function* uuid(start_index){
    let i = start_index;
    while (true) {
        yield i++;
    }
}






