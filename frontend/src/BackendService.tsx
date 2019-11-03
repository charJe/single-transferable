import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";


interface Poll {
    name: string,
    prompt: string,
    choices: [
        {
            name: string,
            info: string
        }
    ]
}
export class BackendService {
    
    client = new ApolloClient({
        uri: 'https://48p1r2roz4.sse.codesandbox.io',
    });
    
    vote(accessor: string) {
        let poll: Poll;
        return this.client.query({
            query: gql`
                {
                    ${accessor} {
                        name
                        prompt
                        choices
                    }
                }`
        }).then((result: Poll) => poll = result);
    }
}
