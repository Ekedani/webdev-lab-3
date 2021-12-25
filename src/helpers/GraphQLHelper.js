class GraphQLHelper{
    constructor() {
        this.API_URL = "https://webdev-labs.herokuapp.com/v1/graphql";
    }

    async fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(this.API_URL, {
            method: "POST",
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName,
            }),
        });

        return await result.json();
    }

    async startExecuteMyMutation(operationsDoc, variables = {}) {
        console.log(operationsDoc);
        const { errors, data } = await this.executeMyMutation(
            operationsDoc,
            variables
        );
        if (errors) {
            console.error(errors);
        }
        console.log(data);
        return data;
    }

    executeMyMutation(operationsDoc, variables) {
        return this.fetchGraphQL(operationsDoc, "MyMutation", variables);
    }
}

export default new GraphQLHelper();