import { IPlainTransactionObject, SmartContractTransactionsFactory } from "@multiversx/sdk-core";
import { TransactionsFactoryConfig } from "@multiversx/sdk-core";
import { Address } from "@multiversx/sdk-core";
import { AbiRegistry } from "@multiversx/sdk-core";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { QueryRunnerAdapter } from "@multiversx/sdk-core";
import { SmartContractQueriesController } from "@multiversx/sdk-core";
import { TokenTransfer } from "@multiversx/sdk-core";
import { Transaction } from "@multiversx/sdk-core";

export class Tema1 {
    private readonly factory: SmartContractTransactionsFactory;
    private readonly abi: AbiRegistry;
    private readonly contractAddress: Address;
    private readonly queryController: SmartContractQueriesController;

    constructor() {
        const plainAbi: any = {
            buildInfo: {
                rustc: {
                    version: "1.81.0",
                    commitHash: "eeb90cda1969383f56a2637cbd3037bdf598841c",
                    commitDate: "2024-09-04",
                    channel: "Stable",
                    short: "rustc 1.81.0 (eeb90cda1 2024-09-04)",
                },
                contractCrate: { name: "tema-1", version: "0.0.0" },
                framework: { name: "multiversx-sc", version: "0.53.2" },
            },
            name: "Tema1",
            constructor: { inputs: [], outputs: [] },
            upgradeConstructor: { inputs: [], outputs: [] },
            endpoints: [
                {
                    name: "issueNft",
                    onlyOwner: true,
                    mutability: "mutable",
                    payableInTokens: ["EGLD"],
                    inputs: [
                        { name: "token_display_name", type: "bytes" },
                        { name: "token_ticker", type: "bytes" },
                    ],
                    outputs: [],
                },
                {
                    name: "createNftWithAttributes",
                    onlyOwner: true,
                    mutability: "mutable",
                    inputs: [
                        { name: "name", type: "bytes" },
                        { name: "class", type: "u8" },
                        { name: "rarity", type: "u8" },
                        { name: "power", type: "u8" },
                    ],
                    outputs: [],
                    payableInTokens: [],
                },
                {
                    name: "getYourNftCardProperties",
                    mutability: "mutable",
                    inputs: [],
                    outputs: [{ type: "CardProperties" }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "exchangeNft",
                    mutability: "mutable",
                    payableInTokens: ["*"],
                    inputs: [{ name: "nonce", type: "u64" }],
                    outputs: [],
                    onlyOwner: false,
                },
                {
                    name: "getTokenId",
                    mutability: "readonly",
                    inputs: [],
                    outputs: [{ type: "TokenIdentifier" }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "getTokenData",
                    mutability: "readonly",
                    inputs: [{ name: "token_nonce", type: "u64" }],
                    outputs: [{ type: "EsdtTokenData" }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "tokenId",
                    mutability: "readonly",
                    inputs: [],
                    outputs: [{ type: "TokenIdentifier" }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "nftSupply",
                    mutability: "readonly",
                    inputs: [],
                    outputs: [{ type: "variadic<EsdtTokenData>", multi_result: true }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "cardsProperties",
                    mutability: "readonly",
                    inputs: [],
                    outputs: [{ type: "variadic<CardProperties>", multi_result: true }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "studentsCards",
                    mutability: "readonly",
                    inputs: [{ name: "student_address", type: "Address" }],
                    outputs: [{ type: "CardProperties" }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "studentsAddresses",
                    mutability: "readonly",
                    inputs: [],
                    outputs: [{ type: "variadic<Address>", multi_result: true }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
            ],
            esdtAttributes: [],
            hasCallback: true,
            types: {
                CardProperties: {
                    type: "struct",
                    fields: [
                        { name: "class", type: "Class" },
                        { name: "rarity", type: "Rarity" },
                        { name: "power", type: "Power" },
                    ],
                },
                Class: {
                    type: "enum",
                    variants: [
                        { name: "Warrior", discriminant: 0 },
                        { name: "Mage", discriminant: 1 },
                        { name: "Rogue", discriminant: 2 },
                        { name: "Priest", discriminant: 3 },
                        { name: "Hunter", discriminant: 4 },
                        { name: "Warlock", discriminant: 5 },
                        { name: "Shaman", discriminant: 6 },
                        { name: "Druid", discriminant: 7 },
                        { name: "Paladin", discriminant: 8 },
                    ],
                },
                EsdtTokenData: {
                    type: "struct",
                    fields: [
                        { name: "token_type", type: "EsdtTokenType" },
                        { name: "amount", type: "BigUint" },
                        { name: "frozen", type: "bool" },
                        { name: "hash", type: "bytes" },
                        { name: "name", type: "bytes" },
                        { name: "attributes", type: "bytes" },
                        { name: "creator", type: "Address" },
                        { name: "royalties", type: "BigUint" },
                        { name: "uris", type: "List<bytes>" },
                    ],
                },
                EsdtTokenType: {
                    type: "enum",
                    variants: [
                        { name: "Fungible", discriminant: 0 },
                        { name: "NonFungible", discriminant: 1 },
                        { name: "SemiFungible", discriminant: 2 },
                        { name: "Meta", discriminant: 3 },
                        { name: "Invalid", discriminant: 4 },
                    ],
                },
                Power: {
                    type: "enum",
                    variants: [
                        { name: "Low", discriminant: 0 },
                        { name: "Medium", discriminant: 1 },
                        { name: "High", discriminant: 2 },
                    ],
                },
                Rarity: {
                    type: "enum",
                    variants: [
                        { name: "Common", discriminant: 0 },
                        { name: "Rare", discriminant: 1 },
                        { name: "Epic", discriminant: 2 },
                        { name: "Legendary", discriminant: 3 },
                    ],
                },
            },
        };
        this.abi = AbiRegistry.create(plainAbi);
        const config = new TransactionsFactoryConfig({ chainID: "D" });
        this.factory = new SmartContractTransactionsFactory({ config: config, abi: this.abi });
        this.contractAddress = Address.fromBech32("erd1qqqqqqqqqqqqqpgqtpxhlcckhltvs3pf3dj6ullt4nt6e7ahuvaqcetetf");

        const api = new ApiNetworkProvider("https://devnet-api.multiversx.com");
        const queryRunner = new QueryRunnerAdapter({ networkProvider: api });
        this.queryController = new SmartContractQueriesController({ abi: this.abi, queryRunner: queryRunner });
    }

    issueNft(options: {
        tokenDisplayName: Uint8Array;
        tokenTicker: Uint8Array;
        nativeTransferAmount?: bigint;
        tokenTransfers?: TokenTransfer[];
    }): Transaction {
        let args: any[] = [];

        args.push(options.tokenDisplayName);
        args.push(options.tokenTicker);

        const tx = this.factory.createTransactionForExecute({
            sender: Address.empty(),
            contract: this.contractAddress,
            function: "issueNft",
            gasLimit: 0n,
            arguments: args,
            nativeTransferAmount: options.nativeTransferAmount,
            tokenTransfers: options.tokenTransfers,
        });

        return tx;
    }

    createNftWithAttributes(options: { name: Uint8Array; class: number; rarity: number; power: number }): Transaction {
        let args: any[] = [];

        args.push(options.name);
        args.push(options.class);
        args.push(options.rarity);
        args.push(options.power);

        const tx = this.factory.createTransactionForExecute({
            sender: Address.empty(),
            contract: this.contractAddress,
            function: "createNftWithAttributes",
            gasLimit: 0n,
            arguments: args,
        });

        return tx;
    }

    getYourNftCardProperties(): Transaction {
        let args: any[] = [];

        const tx = this.factory.createTransactionForExecute({
            sender: Address.empty(),
            contract: this.contractAddress,
            function: "getYourNftCardProperties",
            gasLimit: 5000000n,
            arguments: args,
        });

        return tx;
    }

    exchangeNft(options: {
        nonce: bigint;
        nativeTransferAmount?: bigint;
        tokenTransfers?: TokenTransfer[];
    }): Transaction {
        let args: any[] = [];

        args.push(options.nonce);

        const tx = this.factory.createTransactionForExecute({
            sender: Address.empty(),
            contract: this.contractAddress,
            function: "exchangeNft",
            gasLimit: 60000000n,
            arguments: args,
            nativeTransferAmount: options.nativeTransferAmount,
            tokenTransfers: options.tokenTransfers,
        });

        return tx;
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async getTokenId(): Promise<any[]> {
        let args: any[] = [];

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "getTokenId",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async getTokenData(options: { tokenNonce: bigint }): Promise<any[]> {
        let args: any[] = [];

        args.push(options.tokenNonce);

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "getTokenData",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async tokenId(): Promise<any[]> {
        let args: any[] = [];

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "tokenId",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async nftSupply(): Promise<any[]> {
        let args: any[] = [];

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "nftSupply",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async cardsProperties(): Promise<any[]> {
        let args: any[] = [];

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "cardsProperties",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async studentsCards(options: { studentAddress: Address }): Promise<any[]> {
        let args: any[] = [];

        args.push(options.studentAddress);

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "studentsCards",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async studentsAddresses(): Promise<any[]> {
        let args: any[] = [];

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "studentsAddresses",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }
}
