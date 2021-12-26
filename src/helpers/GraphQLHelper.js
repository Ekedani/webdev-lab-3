class GraphQLHelper {
    constructor() {
        /* eslint-disable */
        this.API_URL = API_ROOT;
        /* eslint-enable */
    }

    async fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(this.API_URL, {
            method: 'POST',
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        });

        return await result.json();
    }

    async startExecuteMyMutation(operationsDoc, variables = {}) {
        const { errors, data } = await this.executeMyMutation(
            operationsDoc,
            variables
        );
        if (errors) {
            throw new Error(errors);
        }
        return data;
    }

    executeMyMutation(operationsDoc, variables) {
        return this.fetchGraphQL(operationsDoc, 'MyMutation', variables);
    }
}

export default new GraphQLHelper();
