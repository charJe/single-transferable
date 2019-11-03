import ApolloClient from "apollo-boost";
import { gql} from "apollo-boost";

const client = new ApolloClient({
    uri: 'localhost',
});
interface Choice {
    name: string,
    info: string,
    id: number
}
export interface Poll {
    name: string,
    prompt: string,
    choices: Choice[]
}
export interface Vote {
    id: number,
    rank: number,
    
}
export function getPoll(accessor: string) {
    let poll: Poll;
    return client.query({
        query: gql`
            {
                polls(accessor:${accessor}) {
                    name
                    prompt
                    choices
                }
            }`
    }).then((result:any ) => poll = result);
}
export function sendVote() {
    
}

