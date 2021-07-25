---
title: Cardano Wallet documentation
layout: template
filename: cardanowallet
---

# Cardano Wallet documentation

## Installation

## Service
```
 [Unit]
    Description=ROT13 demo service
    After=network.target
    StartLimitIntervalSec=0
    
    [Service]
    Type=simple
    Restart=always
    RestartSec=1
    User=cardano
    ExecStart=/usr/local/bin/cardano-wallet serve --listen-address '*' --testnet /byron-genesis.json --node-socket /...node0.socket --database /home/.../wallets-testnet
    KillSignal=SIGINT
    SuccessExitStatus=143
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=cardanowallet
    TimeoutStopSec=5
    KillMode=mixed
    RuntimeMaxSec=86400
    
    [Install]
    WantedBy=multi-user.target
```

## Trouble shooting
