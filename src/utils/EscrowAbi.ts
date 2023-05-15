const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address'
      }
    ],
    name: 'ContractCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'WithdrawlSuccessful',
    type: 'event'
  },
  {
    inputs: [],
    name: 'accountInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'client',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'freelancer',
            type: 'address'
          }
        ],
        internalType: 'struct Escrow.Parties',
        name: 'parties',
        type: 'tuple'
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'disputer',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'content_id',
        type: 'string'
      },
      {
        internalType: 'enum Escrow.PaymentType',
        name: 'payment_type',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'timesframe',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'balance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'current_milestone',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_messageHash',
        type: 'bytes32'
      }
    ],
    name: 'getEthSignedMessageHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_msg',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256'
      }
    ],
    name: 'getMessageHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_address',
        type: 'address[]'
      },
      {
        internalType: 'string',
        name: 'cid',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_msg',
        type: 'string'
      },
      {
        internalType: 'uint256[]',
        name: '_milestones_amounts',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes[]',
        name: '_signatures',
        type: 'bytes[]'
      },
      {
        internalType: 'uint256[]',
        name: '_timestamps',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: '_protocol_fee',
        type: 'uint256'
      },
      {
        internalType: 'enum Escrow.PaymentType',
        name: '_payment_type',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: '_timeframe',
        type: 'uint256'
      }
    ],
    name: 'initContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'markDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'milestones_amounts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'payment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'protocol',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_ethSignedMessageHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'recoverSigner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'releasePayment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_disputer',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_msg',
        type: 'string'
      },
      {
        internalType: 'bytes',
        name: '_clientSig',
        type: 'bytes'
      },
      {
        internalType: 'uint256',
        name: '_clientSigTimestamp',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_freelancerSig',
        type: 'bytes'
      },
      {
        internalType: 'uint256',
        name: '_freelancerSigTimestamp',
        type: 'uint256'
      }
    ],
    name: 'setDisputer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'sig',
        type: 'bytes'
      }
    ],
    name: 'splitSignature',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32'
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_newstatus',
        type: 'bool'
      }
    ],
    name: 'updateApproval',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8[]',
        name: '_index',
        type: 'uint8[]'
      },
      {
        internalType: 'uint256[]',
        name: '_milestones_amounts',
        type: 'uint256[]'
      },
      {
        internalType: 'string',
        name: '_msg',
        type: 'string'
      },
      {
        internalType: 'bytes',
        name: '_freelancerSig',
        type: 'bytes'
      },
      {
        internalType: 'uint256',
        name: '_freelancerSigTimestamp',
        type: 'uint256'
      }
    ],
    name: 'upgradeMilestones',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_msg',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'verify',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_payee',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'withdrawByDisputer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export default abi;
