export const abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_allo", type: "address", internalType: "address" },
      { name: "_name", type: "string", internalType: "string" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "NATIVE",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allocate",
    inputs: [
      { name: "_data", type: "bytes", internalType: "bytes" },
      { name: "_sender", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "allocatedGrantAmount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "distribute",
    inputs: [
      { name: "_recipientIds", type: "address[]", internalType: "address[]" },
      { name: "_data", type: "bytes", internalType: "bytes" },
      { name: "_sender", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllo",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IAllo" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMilestoneStatus",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
      { name: "_milestoneId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "", type: "uint8", internalType: "enum IStrategy.Status" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMilestones",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct DirectGrantsSimpleStrategy.Milestone[]",
        components: [
          {
            name: "amountPercentage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "metadata",
            type: "tuple",
            internalType: "struct Metadata",
            components: [
              { name: "protocol", type: "uint256", internalType: "uint256" },
              { name: "pointer", type: "string", internalType: "string" },
            ],
          },
          {
            name: "milestoneStatus",
            type: "uint8",
            internalType: "enum IStrategy.Status",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPayouts",
    inputs: [
      { name: "_recipientIds", type: "address[]", internalType: "address[]" },
      { name: "_data", type: "bytes[]", internalType: "bytes[]" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IStrategy.PayoutSummary[]",
        components: [
          {
            name: "recipientAddress",
            type: "address",
            internalType: "address",
          },
          { name: "amount", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPoolAmount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPoolId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRecipient",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct DirectGrantsSimpleStrategy.Recipient",
        components: [
          { name: "useRegistryAnchor", type: "bool", internalType: "bool" },
          {
            name: "recipientAddress",
            type: "address",
            internalType: "address",
          },
          { name: "grantAmount", type: "uint256", internalType: "uint256" },
          {
            name: "metadata",
            type: "tuple",
            internalType: "struct Metadata",
            components: [
              { name: "protocol", type: "uint256", internalType: "uint256" },
              { name: "pointer", type: "string", internalType: "string" },
            ],
          },
          {
            name: "recipientStatus",
            type: "uint8",
            internalType: "enum IStrategy.Status",
          },
          {
            name: "milestonesReviewStatus",
            type: "uint8",
            internalType: "enum IStrategy.Status",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRecipientStatus",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
    ],
    outputs: [
      { name: "", type: "uint8", internalType: "enum IStrategy.Status" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getStrategyId",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantAmountRequired",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "increasePoolAmount",
    inputs: [{ name: "_amount", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "_poolId", type: "uint256", internalType: "uint256" },
      { name: "_data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isPoolActive",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isValidAllocator",
    inputs: [{ name: "_allocator", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "metadataRequired",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "milestones",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountPercentage", type: "uint256", internalType: "uint256" },
      {
        name: "metadata",
        type: "tuple",
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
      {
        name: "milestoneStatus",
        type: "uint8",
        internalType: "enum IStrategy.Status",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerRecipient",
    inputs: [
      { name: "_data", type: "bytes", internalType: "bytes" },
      { name: "_sender", type: "address", internalType: "address" },
    ],
    outputs: [
      { name: "recipientId", type: "address", internalType: "address" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "registrationEndTime",
    inputs: [],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registrationStartTime",
    inputs: [],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registryGating",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rejectMilestone",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
      { name: "_milestoneId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reviewSetMilestones",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
      { name: "_status", type: "uint8", internalType: "enum IStrategy.Status" },
      { name: "milestonesHash", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMilestones",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
      {
        name: "_milestones",
        type: "tuple[]",
        internalType: "struct DirectGrantsSimpleStrategy.Milestone[]",
        components: [
          {
            name: "amountPercentage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "metadata",
            type: "tuple",
            internalType: "struct Metadata",
            components: [
              { name: "protocol", type: "uint256", internalType: "uint256" },
              { name: "pointer", type: "string", internalType: "string" },
            ],
          },
          {
            name: "milestoneStatus",
            type: "uint8",
            internalType: "enum IStrategy.Status",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPoolActive",
    inputs: [{ name: "_flag", type: "bool", internalType: "bool" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRecipientStatusToInReview",
    inputs: [
      { name: "_recipientIds", type: "address[]", internalType: "address[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "submitMilestone",
    inputs: [
      { name: "_recipientId", type: "address", internalType: "address" },
      { name: "_milestoneId", type: "uint256", internalType: "uint256" },
      {
        name: "_metadata",
        type: "tuple",
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upcomingMilestone",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "updatePoolTimestamps",
    inputs: [
      {
        name: "_registrationStartTime",
        type: "uint64",
        internalType: "uint64",
      },
      { name: "_registrationEndTime", type: "uint64", internalType: "uint64" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "_amount", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Allocated",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Distributed",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipientAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "poolId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      { name: "data", type: "bytes", indexed: false, internalType: "bytes" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MilestoneStatusChanged",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "milestoneId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "status",
        type: "uint8",
        indexed: false,
        internalType: "enum IStrategy.Status",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MilestoneSubmitted",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "milestoneId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "metadata",
        type: "tuple",
        indexed: false,
        internalType: "struct Metadata",
        components: [
          { name: "protocol", type: "uint256", internalType: "uint256" },
          { name: "pointer", type: "string", internalType: "string" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MilestonesReviewed",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "status",
        type: "uint8",
        indexed: false,
        internalType: "enum IStrategy.Status",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MilestonesSet",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "milestonesLength",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolActive",
    inputs: [
      { name: "active", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RecipientStatusChanged",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "status",
        type: "uint8",
        indexed: false,
        internalType: "enum IStrategy.Status",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Registered",
    inputs: [
      {
        name: "recipientId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "data", type: "bytes", indexed: false, internalType: "bytes" },
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TimestampsUpdated",
    inputs: [
      {
        name: "registrationStartTime",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "registrationEndTime",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "ALLOCATION_ACTIVE", inputs: [] },
  { type: "error", name: "ALLOCATION_EXCEEDS_POOL_AMOUNT", inputs: [] },
  { type: "error", name: "ALLOCATION_NOT_ACTIVE", inputs: [] },
  { type: "error", name: "ALLOCATION_NOT_ENDED", inputs: [] },
  { type: "error", name: "ALREADY_INITIALIZED", inputs: [] },
  { type: "error", name: "AMOUNT_MISMATCH", inputs: [] },
  { type: "error", name: "ANCHOR_ERROR", inputs: [] },
  { type: "error", name: "ARRAY_MISMATCH", inputs: [] },
  { type: "error", name: "INVALID", inputs: [] },
  { type: "error", name: "INVALID_ADDRESS", inputs: [] },
  { type: "error", name: "INVALID_FEE", inputs: [] },
  { type: "error", name: "INVALID_METADATA", inputs: [] },
  { type: "error", name: "INVALID_MILESTONE", inputs: [] },
  { type: "error", name: "INVALID_REGISTRATION", inputs: [] },
  { type: "error", name: "IS_APPROVED_STRATEGY", inputs: [] },
  { type: "error", name: "MILESTONES_ALREADY_SET", inputs: [] },
  { type: "error", name: "MILESTONE_ALREADY_ACCEPTED", inputs: [] },
  { type: "error", name: "MISMATCH", inputs: [] },
  { type: "error", name: "NONCE_NOT_AVAILABLE", inputs: [] },
  { type: "error", name: "NON_ZERO_VALUE", inputs: [] },
  { type: "error", name: "NOT_APPROVED_STRATEGY", inputs: [] },
  { type: "error", name: "NOT_ENOUGH_FUNDS", inputs: [] },
  { type: "error", name: "NOT_IMPLEMENTED", inputs: [] },
  { type: "error", name: "NOT_INITIALIZED", inputs: [] },
  { type: "error", name: "NOT_PENDING_OWNER", inputs: [] },
  { type: "error", name: "POOL_ACTIVE", inputs: [] },
  { type: "error", name: "POOL_INACTIVE", inputs: [] },
  { type: "error", name: "RECIPIENT_ALREADY_ACCEPTED", inputs: [] },
  {
    type: "error",
    name: "RECIPIENT_ERROR",
    inputs: [{ name: "recipientId", type: "address", internalType: "address" }],
  },
  { type: "error", name: "RECIPIENT_NOT_ACCEPTED", inputs: [] },
  { type: "error", name: "REGISTRATION_ACTIVE", inputs: [] },
  { type: "error", name: "REGISTRATION_NOT_ACTIVE", inputs: [] },
  { type: "error", name: "UNAUTHORIZED", inputs: [] },
  { type: "error", name: "ZERO_ADDRESS", inputs: [] },
] as const;
