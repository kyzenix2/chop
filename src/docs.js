export const docGroups = [
  {
    label: "Start",
    pages: [
      {
        slug: "introduction",
        nav: "What Chop is",
        title: "What Chop is",
        toc: [
          ["do", "What you can do"],
          ["dont", "What Chop doesn't do"],
          ["where", "Where it runs"],
        ],
        body: `
          <p>Chop pays you for volatility. You wrap a token into a <a href="/docs/logs">log</a>, pair the log token with its selected pool asset, and stake it. Every time someone wraps, unwraps or trades that log token, they pay a fee. 15% is burned as log tokens. After any partner share, the remaining fee value is converted to $CHOP; 20% is burned and 80% goes to farmers.</p>
          <p>Markets chop. Prices swing up and down without going anywhere, and most strategies bleed. Chop is built for exactly that market. Every swing opens a gap between a log token and the token it holds, traders close the gap, and every trade they make pays fees.</p>
          <h2 id="do">What you can do <a href="#do">#</a></h2>
          <ul>
            <li>Wrap a token into a log and hold the log token. 15% of fees is burned as log tokens, which raises how much each log token is backed by.</li>
            <li>Farm by pairing the log token with its pool asset and staking it, to earn a share of the $CHOP allocated to farmers.</li>
            <li>Harvest your rewards whenever you like.</li>
          </ul>
          <h2 id="dont">What Chop doesn't do <a href="#dont">#</a></h2>
          <ul>
            <li>No yield forecasts. Rewards depend on how much people trade, and nobody can predict that. Historical APY uses cumulative on-chain results and is explicitly backward-looking.</li>
            <li>No leverage or borrowing.</li>
            <li>No unlimited approvals. The app asks your wallet to approve exactly the amount you're using.</li>
          </ul>
          <h2 id="where">Where it runs <a href="#where">#</a></h2>
          <p>Chop runs on Robinhood Chain, an Ethereum layer 2. You pay gas in ETH.</p>
        `,
      },
      {
        slug: "getting-started",
        nav: "Getting started",
        title: "Getting started",
        toc: [
          ["need", "What you need"],
          ["connect", "Connect"],
          ["wrap", "Wrap your first token"],
          ["farm", "Start farming"],
        ],
        body: `
          <h2 id="need">What you need <a href="#need">#</a></h2>
          <ul>
            <li>A browser wallet, such as MetaMask or Rabby.</li>
            <li>A little ETH on Robinhood Chain to pay for gas.</li>
            <li>The token you want to wrap, and that log's paired token if you want to farm.</li>
          </ul>
          <h2 id="connect">Connect <a href="#connect">#</a></h2>
          <p>Select Connect wallet. If your wallet is on another network, the button changes to Switch to Robinhood Chain. Select it and approve the network in your wallet.</p>
          <h2 id="wrap">Wrap your first token <a href="#wrap">#</a></h2>
          <ol>
            <li>Open <a href="/logs">Logs</a> and pick one. Each log wraps one token: chETH wraps ETH.</li>
            <li>On the Wrap tab, enter an amount. You'll see what you receive and the fee before you sign anything.</li>
            <li>Approve the token, for exactly the amount you're wrapping, then confirm the wrap.</li>
          </ol>
          <h2 id="farm">Start farming <a href="#farm">#</a></h2>
          <ol>
            <li>On the same log, open Farm and enter how many log tokens to farm. The app fills in the paired token needed at the pool's current price.</li>
            <li>Approve both tokens, then confirm. Your liquidity is added and staked in one transaction.</li>
            <li>Harvest from the Harvest tab, or harvest everything at once from <a href="/portfolio">Portfolio</a>.</li>
          </ol>
          <p>Before farming, read <a href="/docs/farming">Farming</a> for paired-token exposure and impermanent loss, and <a href="/docs/risks">Risks</a>.</p>
        `,
      },
    ],
  },
  {
    label: "How it works",
    pages: [
      {
        slug: "logs",
        nav: "Logs",
        title: "Logs",
        toc: [
          ["backing", "Backing"],
          ["price", "Why a log token's price moves on its own"],
          ["gap", "The gap"],
          ["which", "Which logs you see"],
        ],
        body: `
          <p>A log is a vault that holds one token and issues its own token in return: the log token. Log tokens use the <code>ch</code> prefix. Wrap ETH, get chETH.</p>
          <h2 id="backing">Backing <a href="#backing">#</a></h2>
          <p>Each log token is backed by the tokens the log holds. 15% of fees is burned as log tokens, so the same pile of tokens is shared by fewer log tokens, and each one is backed by a little more.</p>
          <p>Backing is measured in the underlying token, not in dollars, and nothing in a log's rules lets it fall. If ETH drops, chETH drops with it; it's still backed by at least as much ETH as before.</p>
          <h2 id="price">Why a log token's price moves on its own <a href="#price">#</a></h2>
          <p>Log tokens trade in their own pool against the paired token selected when the log was created. When the underlying token moves, the log token's pool price lags behind. That gap is an opportunity: traders wrap or unwrap to buy low and sell high, and every move pays fees. The bigger and more frequent the swings, the more fees.</p>
          <h2 id="gap">The gap <a href="#gap">#</a></h2>
          <p>Each log's page shows the gap: how far the log token trades from its backing, valued at the wrapped token's market price. Arbitrage only pays once the gap is bigger than the fees on a round trip. The log-side fees total according to its Stable or Volatile fee set. The paired token's own route can add another cost, so the profitable gap may be wider than the log-side fees alone. Inside that band, nothing happens. Outside it, traders step in, and fees flow.</p>
          <h2 id="which">Which logs you see <a href="#which">#</a></h2>
          <p>Anyone can deploy a log contract. Public logs that pass the standard checks can appear as Unverified; the team can tag reviewed logs Verified. A log on a token or pair that stops trading earns nothing.</p>
          <blockquote class="callout">If a log wraps a tokenized stock: tokenized stocks on Robinhood Chain have transfer rules set by their issuer. A log holding them depends on those rules.</blockquote>
          <p>Every log page names its paired token. Farmers deposit that asset alongside the log token.</p>
        `,
      },
      {
        slug: "launching-a-log",
        nav: "Launching a log",
        title: "Launching a log",
        toc: [
          ["pool", "What the pool needs"],
          ["price", "Setting the starting price"],
          ["pairs", "Paired assets and rewards"],
          ["seed", "Seeded liquidity"],
        ],
        body: `
          <p>Any project can have a log for its token. The creator chooses the ERC-20 token used as its pool pair.</p>
          <h2 id="pool">What the pool needs <a href="#pool">#</a></h2>
          <p>Wrapping needs only the project's token. The pool needs both the log token and the selected paired token, in equal value.</p>
          <h2 id="price">Setting the starting price <a href="#price">#</a></h2>
          <p>Self-serve creation at <a href="/launch">Launch a log</a> opens after deployment review. You choose the wrapped ERC-20 and its paired token; CHOP is the default pair and rewards always remain in CHOP. The current release supports Volatile fees: 1% wrap/unwrap and 0.5% buy/sell. Browser initial seeding is unavailable. Funded launch logs use the team's reviewed atomic creation and seeding flow. The registry owner verifies the log, its fee oracle matures, then the creator or authorized operator publishes it.</p>
          <p>The first liquidity added sets the starting price. A new pool is seeded with a small amount first, checked against market prices, then topped up.</p>
          <h2 id="pairs">Paired assets and rewards <a href="#pairs">#</a></h2>
          <p>The paired token is fixed when the log is created. Farmers use that token when adding liquidity. Farmer rewards are paid in $CHOP, regardless of the selected pair. The launch candidate supports CHOP, WETH and USDG pairings. A non-CHOP pair requires a governance-approved V4 route into CHOP. A dedicated keeper converts those proceeds with explicit price limits; supported routes must be reviewed against the actual launch pools and hooks.</p>
          <h2 id="seed">Seeded liquidity <a href="#seed">#</a></h2>
          <p>Seeded positions are staked and earn farmer rewards like any other. The lock terms will be confirmed before launch.</p>
          <blockquote class="callout">To fill before launch: lock length and any seed-grant terms.</blockquote>
        `,
      },
      {
        slug: "wrap-and-unwrap",
        nav: "Wrap and unwrap",
        title: "Wrap and unwrap",
        toc: [
          ["fees", "Fees"],
          ["sign", "What you see before you sign"],
          ["approvals", "Approvals"],
        ],
        body: `
          <p>Wrap deposits a token into a log and mints log tokens to you. Unwrap burns log tokens and returns the underlying token.</p>
          <h2 id="fees">Fees <a href="#fees">#</a></h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Action</th><th>Stable</th><th>Volatile</th></tr></thead>
            <tbody>
              <tr><td>Wrap</td><td>0.2%</td><td>1%</td></tr>
              <tr><td>Unwrap</td><td>0.3%</td><td>1%</td></tr>
            </tbody>
          </table></div>
          <p>Each log uses one of these fee sets and shows it on its page. Two exceptions: the first person to wrap into a new log pays no wrap fee, and the last person to unwrap pays no unwrap fee.</p>
          <p>A Stable round trip usually costs about 0.5%; a Volatile round trip usually costs about 2%. The first-wrap and final-unwrap exceptions can make it lower.</p>
          <h2 id="sign">What you see before you sign <a href="#sign">#</a></h2>
          <p>The app shows an estimate after fees. Wrap transactions enforce a minimum output. Unwrapping through this frontend is currently disabled because the deployed interface shown in this repository cannot enforce a minimum underlying amount.</p>
          <h2 id="approvals">Approvals <a href="#approvals">#</a></h2>
          <p>New wrapping approvals request the amount needed, never an unlimited amount. A previously larger approval can remain after a failed later step. Unwrapping needs no approval.</p>
        `,
      },
      {
        slug: "farming",
        nav: "Farming",
        title: "Farming",
        toc: [
          ["earn", "What you earn"],
          ["pair", "How much of the paired token you need"],
          ["slip", "Slippage"],
          ["il", "Impermanent loss"],
          ["exposure", "Your paired-token and $CHOP exposure"],
          ["stop", "Stop farming"],
        ],
        body: `
          <p>Farming puts your log tokens and that log's paired token into the pool and stakes the liquidity so it can receive the farmer share of $CHOP funded by fees.</p>
          <h2 id="earn">What you earn <a href="#earn">#</a></h2>
          <p>After the log-token burn and any partner share, the remaining fee value is converted to $CHOP by the configured fee route. 20% of that $CHOP is burned and farmers share the other 80%. See <a href="/docs/fees">Fees and where they go</a> for the split.</p>
          <h2 id="pair">How much of the paired token you need <a href="#pair">#</a></h2>
          <p>Liquidity goes in at the pool's current price, so the app calculates the paired token needed to match your log tokens. Anything that doesn't fit is refunded in the same transaction.</p>
          <h2 id="slip">Slippage <a href="#slip">#</a></h2>
          <p>The default is 1%. If the pool price moves more than that before your transaction lands, it fails and nothing moves. You can choose 0.5%, 1% or 2%.</p>
          <h2 id="il">Impermanent loss <a href="#il">#</a></h2>
          <p>A pool rebalances as prices move: it sells the side that's rising and buys the side that's falling. If the log token's price moves a lot, you can end up with less value than if you'd just held. Both sides of this pool move, so impermanent loss can be larger than in a stablecoin pool. Fees offset it, but they don't always cover it.</p>
          <p>Example: you add 1 chETH and the same value in its paired token. As both tokens move, the pool continually rebalances your share. Holding the two tokens outside the pool can be worth more than the rebalanced position. That difference is impermanent loss. If the relative price returns to where you started, it disappears.</p>
          <h2 id="exposure">Your paired-token and $CHOP exposure <a href="#exposure">#</a></h2>
          <p>Part of your position is in the paired token, while rewards are paid in $CHOP. Either token can fall in value.</p>
          <p>If nobody has staked liquidity in a log, 100% of that log's rewards are burned until farming begins.</p>
          <h2 id="stop">Stop farming <a href="#stop">#</a></h2>
          <p>Stop farming unstakes your liquidity and removes it in one transaction. You get back log tokens and the paired token, and any rewards you've earned are paid out automatically. There's no lockup and no fee beyond gas.</p>
        `,
      },
      {
        slug: "harvesting",
        nav: "Harvesting",
        title: "Harvesting",
        toc: [
          ["paid", "What you're paid in"],
          ["all", "Harvest all"],
          ["wait", "When rewards wait"],
          ["none", "Nothing to harvest?"],
        ],
        body: `
          <p>Rewards build up in each log's rewards contract after fee value is converted to $CHOP. Harvest sends your share to your wallet.</p>
          <h2 id="paid">What you're paid in <a href="#paid">#</a></h2>
          <p>At launch, logs pay rewards in $CHOP. The log's page shows the reward token and the amount available. Before farmer rewards are distributed, 20% of the funded $CHOP is burned.</p>
          <h2 id="all">Harvest all <a href="#all">#</a></h2>
          <p><a href="/portfolio">Portfolio</a> has a Harvest all button that claims from every log you farm, in one transaction. Adding to or stopping a farm also pays out what you've earned so far.</p>
          <h2 id="wait">When rewards wait <a href="#wait">#</a></h2>
          <p>Remaining fee value is converted to $CHOP by the configured fee route. The protocol uses a time-weighted price to protect that swap. If the price isn't available yet, for example right after a pool launches, the swap waits and fee value builds up until it can run. Wrapping, unwrapping and trading keep working the whole time.</p>
          <h2 id="none">Nothing to harvest? <a href="#none">#</a></h2>
          <p>Rewards only arrive when people wrap, unwrap and trade the log token. Quiet markets mean small rewards.</p>
          <p>If nobody is farming a log, its rewards are burned instead of waiting for a future farmer.</p>
        `,
      },
      {
        slug: "fees",
        nav: "Fees and where they go",
        title: "Fees and where they go",
        toc: [
          ["the-fees", "The fees"],
          ["where", "Where they go"],
          ["example", "An example"],
          ["partner", "Partner fees"],
        ],
        body: `
          <h2 id="the-fees">The fees <a href="#the-fees">#</a></h2>
          <p>Fees depend on the log's fee set, chosen when the log is created.</p>
          <div class="table-wrap"><table>
            <thead><tr><th>Action</th><th>Stable</th><th>Volatile</th></tr></thead>
            <tbody>
              <tr><td>Wrap</td><td>0.2%</td><td>1%</td></tr>
              <tr><td>Unwrap</td><td>0.3%</td><td>1%</td></tr>
              <tr><td>Buy the log token in its pool</td><td>0.3%</td><td>0.5%</td></tr>
              <tr><td>Sell the log token in its pool</td><td>0.3%</td><td>0.5%</td></tr>
            </tbody>
          </table></div>
          <p>Both sets burn 15% of fees as log tokens. These fees are fixed on-chain and shown on every log page.</p>
          <h2 id="where">Where they go <a href="#where">#</a></h2>
          <ol>
            <li>15% of every fee is burned as log tokens. That raises the backing of every log token still out there.</li>
            <li>Any partner fee comes off next. Most logs have none.</li>
            <li>The treasury share is 0%. Nothing goes to a treasury or the team.</li>
            <li>The remaining fee value is converted to $CHOP by the configured fee route.</li>
            <li>20% of that $CHOP is burned.</li>
            <li>The other 80% goes to farmers, in proportion to the liquidity they have staked.</li>
          </ol>
          <p>While a log has no staked liquidity, 100% of the $CHOP that would otherwise go to farmers is burned instead.</p>
          <p>Each log's page shows its own split, read live from the contracts.</p>
          <h2 id="example">An example <a href="#example">#</a></h2>
          <p>A Volatile log sees 1,600,000 USDG equivalent of trading in a day, plus 200,000 USDG equivalent of wraps and unwraps. USDG is used only to make the example easy to compare; each log can use its creator-selected paired token.</p>
          <div class="table-wrap"><table>
            <thead><tr><th></th><th>USDG equivalent</th></tr></thead>
            <tbody>
              <tr><td>Trading fees (0.5%)</td><td>8,000</td></tr>
              <tr><td>Wrap and unwrap fees (1%)</td><td>2,000</td></tr>
              <tr><td>Total fees</td><td>10,000</td></tr>
              <tr><td>Burned as log tokens (15%)</td><td>1,500</td></tr>
              <tr><td>Treasury (0%)</td><td>0</td></tr>
              <tr><td>Swapped for $CHOP</td><td>8,500</td></tr>
              <tr><td>$CHOP burned (20% of that)</td><td>1,700</td></tr>
              <tr><td>Paid to farmers (80%)</td><td>6,800</td></tr>
            </tbody>
          </table></div>
          <p>This shows the value split. The number of $CHOP tokens received, burned and paid depends on $CHOP's market price. It assumes no partner fee and isn't a forecast.</p>
          <h2 id="partner">Partner fees <a href="#partner">#</a></h2>
          <p>A log can send part of its fees to a partner, such as the project behind the wrapped token. It is 0% by default and at most 5%. The partner can lower that fee but can never raise it.</p>
        `,
      },
    ],
  },
  {
    label: "$CHOP",
    pages: [
      {
        slug: "chop-token",
        nav: "The $CHOP token",
        title: "The $CHOP token",
        toc: [
          ["supply", "Supply"],
          ["allocation", "Allocation"],
          ["utility", "Token utility"],
          ["demand", "Where demand comes from"],
          ["launch", "Launch"],
          ["contract", "Contract"],
        ],
        body: `
          <h2 id="supply">Supply <a href="#supply">#</a></h2>
          <blockquote class="callout">To fill before launch: total supply, whether the token can mint more, and whether the token can be upgraded, with links.</blockquote>
          <h2 id="allocation">Allocation <a href="#allocation">#</a></h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Allocation</th><th>Share</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td>Product and marketing</td><td>15%</td><td>Reserved to build the product and bring users to Chop.</td></tr>
              <tr><td>Team</td><td>15%</td><td>Nothing unlocks for the first month; it then vests linearly over twelve.</td></tr>
              <tr><td>Liquidity pool</td><td>70%</td><td>The remaining supply sits in the pool's liquidity, launched on Bankr.</td></tr>
            </tbody>
          </table></div>
          <p>The team's allocation is vested: there is a one-month cliff, after which the team's supply vests linearly over twelve months.</p>
          <h2 id="utility">Token utility <a href="#utility">#</a></h2>
          <p>$CHOP is the token every part of the fee flow runs through:</p>
          <ul>
            <li>Farmer rewards. Farmers are paid in $CHOP from wrap, unwrap and trading fees.</li>
            <li>The burn. Of the $CHOP paid out from fees, 20% is burned and 80% goes to farmers. If nobody farms a log, 100% of that log's reward $CHOP is burned.</li>
            <li>The pairing asset. Every log pairs with $CHOP, so wrapping, farming and trading inside Chop all route through it.</li>
            <li>A market of its own. $CHOP's main market is Uniswap V4.</li>
          </ul>
          <h2 id="demand">Where demand comes from <a href="#demand">#</a></h2>
          <p>Farmer rewards are paid in $CHOP. After the log-token burn and any partner share, remaining fee value is converted to $CHOP by the configured fee route. Of that $CHOP, 20% is burned and 80% is distributed to farmers. $CHOP's main market is Uniswap V4.</p>
          <h2 id="launch">Launch <a href="#launch">#</a></h2>
          <p>$CHOP launched on Bankr.</p>
          <blockquote class="callout">To fill before launch: the Bankr launch date and links, whether any allocation was withheld from the launch, and what happened to the initial liquidity position (burned or locked), with transaction links.</blockquote>
          <h2 id="contract">Contract <a href="#contract">#</a></h2>
          <p>The $CHOP address is listed on <a href="/docs/contracts">Contracts</a>.</p>
        `,
      },
    ],
  },
  {
    label: "Safety",
    pages: [
      {
        slug: "risks",
        nav: "Risks",
        title: "Risks",
        toc: [],
        body: `
          <p>Read this before depositing. Nothing on Chop is guaranteed.</p>
          <ul>
            <li><strong>Smart contracts.</strong> This Chop deployment has no published audit evidence yet. Contract failures can cause losses or prevent exits.</li>
            <li><strong>Upgradeable code.</strong> The upgrade-key holder can replace the code behind every log and controls the factory used for future logs. These powers may later move to a multisig or be removed permanently. See <a href="/docs/admin-powers">Who can change what</a>.</li>
            <li><strong>Unverified logs.</strong> Anyone can create a log. Unverified logs haven't been reviewed by Chop and may wrap scam or broken tokens.</li>
            <li><strong>Impermanent loss.</strong> Farming can leave you with less than holding. See <a href="/docs/farming">Farming</a>.</li>
            <li><strong>Fees.</strong> Wrapping and unwrapping each cost up to 1%, depending on the log. Short round trips lose money.</li>
            <li><strong>Historical APY is backward-looking.</strong> Backing APY annualizes observed cumulative backing growth since launch. Farmer APY remains unavailable without historical stake/reward values. These figures do not predict future results.</li>
            <li><strong>$CHOP price.</strong> At launch, rewards are paid in $CHOP, which can fall in value.</li>
            <li><strong>Paired-token risk.</strong> Half of a farm starts in the selected paired token. Its price and liquidity affect the position.</li>
            <li><strong>$CHOP rewards.</strong> A sharp fall in $CHOP lowers the value of farmer rewards.</li>
            <li><strong>Log token price.</strong> A log token can trade below its backing in its pool, especially when liquidity is thin. You can redeem at the contract's backing ratio, minus the unwrap fee, only while the exit succeeds. Frontend unwrapping is currently unavailable; contract/reward failures can also prevent exits.</li>
            <li><strong>The chain.</strong> Robinhood runs the sequencer that orders transactions on Robinhood Chain. It could delay or refuse them.</li>
            <li><strong>Tokenized stocks.</strong> Logs that wrap tokenized stocks depend on the issuer's transfer rules.</li>
          </ul>
        `,
      },
      {
        slug: "admin-powers",
        nav: "Who can change what",
        title: "Who can change what",
        toc: [["nobody", "What nobody can do"]],
        body: `
          <p>Some parts of Chop's contracts can be changed. This page lists every power that exists and who holds it.</p>
          <blockquote class="callout">Audit evidence for this Chop deployment has not been published. Upstream provenance and local tests do not establish an audit of these deployed contracts.</blockquote>
          <div class="table-wrap"><table>
            <thead><tr><th>Power</th><th>Held by</th><th>Limit</th></tr></thead>
            <tbody>
              <tr><td>Upgrade the code behind existing logs and control the log factory</td><td>Upgrade-key holder</td><td>The same holder controls the log factory used for future logs. LockAdmin can move these powers to a multisig or remove them permanently.</td></tr>
              <tr><td>Verify, hide or remove logs from the app list, add other admins, or change the factory used for creation</td><td>IndexManager owner</td><td>Affects listing and future creation.</td></tr>
              <tr><td>Pause reward tokens, add reward tokens, or exempt addresses from the unwrap fee</td><td>RewardsWhitelist owner</td><td>Paused payouts wait until the token is unpaused.</td></tr>
              <tr><td>Change slippage settings or rescue stray tokens from the helper</td><td>IndexUtils owner</td><td>Limited to the helper's settings and tokens it holds.</td></tr>
              <tr><td>Change the treasury share (0%) or the $CHOP burn share (20%)</td><td>Fee-contract/router owners until locking</td><td>Both become locked only after <code>LockAdmin</code> transfers ownership away. Confirm that transaction and final owners before launch.</td></tr>
              <tr><td>Tag logs Verified or Unverified, and hide logs from the site</td><td>Team</td><td>Can't change a log's fees, assets or funds. Hiding only affects this website.</td></tr>
              <tr><td>$CHOP the team provides to seed new log pools</td><td>Team</td><td>Seeded positions are staked and earn farmer rewards. To fill before launch: lock length.</td></tr>
            </tbody>
          </table></div>
          <h2 id="nobody">What nobody can do <a href="#nobody">#</a></h2>
          <ul>
            <li>Send protocol fees to the team. Any fees routed to the admin address go to a burn address.</li>
          </ul>
        `,
      },
      {
        slug: "contracts",
        nav: "Contracts",
        title: "Contracts",
        toc: [
          ["does", "What each contract does"],
          ["source", "Source code"],
        ],
        body: `
          <p>Addresses appear here after launch.</p>
          <div class="table-wrap"><table>
            <tbody>
              <tr><td>Log registry</td><td>Not deployed yet</td></tr>
              <tr><td>Helper</td><td>Not deployed yet</td></tr>
              <tr><td>DEX adapter</td><td>Not deployed yet</td></tr>
              <tr><td>$CHOP</td><td>Not deployed yet</td></tr>
              <tr><td>USDG (pricing asset)</td><td>Not deployed yet</td></tr>
              <tr><td>Fee settings</td><td>Not deployed yet</td></tr>
              <tr><td>Fee router</td><td>Not deployed yet</td></tr>
              <tr><td>Rewards whitelist</td><td>Not deployed yet</td></tr>
              <tr><td>Price helper</td><td>Not deployed yet</td></tr>
              <tr><td>Uniswap V3 factory</td><td>Not deployed yet</td></tr>
              <tr><td>Uniswap V4 Pool manager</td><td>Not deployed yet</td></tr>
              <tr><td>Uniswap V4 router</td><td>Not deployed yet</td></tr>
              <tr><td>V4 rewards keeper</td><td>Not deployed yet</td></tr>
            </tbody>
          </table></div>
          <h2 id="does">What each contract does <a href="#does">#</a></h2>
          <ul>
            <li><strong>Log registry.</strong> The list of logs, and which ones are verified to show in the app.</li>
            <li><strong>Log contracts.</strong> One per log. Each holds its wrapped token, issues the log token and charges fees.</li>
            <li><strong>Staking and rewards.</strong> Each log has a staking contract for farmed liquidity and a rewards contract that pays farmers.</li>
            <li><strong>Fee router.</strong> Converts each log's remaining fee value into $CHOP for burning and farmer rewards.</li>
            <li><strong>Rewards whitelist.</strong> Controls which reward tokens can be paid and whether a token's payouts are paused.</li>
            <li><strong>Price helper.</strong> Supplies the time-weighted prices used when fee value is swapped for $CHOP.</li>
            <li><strong>Helper.</strong> Lets the app farm and stop farming in a single transaction. It's optional; the log contracts work without it.</li>
            <li><strong>$CHOP.</strong> The token farmer rewards are paid in.</li>
            <li><strong>USDG.</strong> A pricing asset used to express comparable dollar values in the interface. The launch candidate supports CHOP, WETH and USDG pairings.</li>
            <li><strong>Uniswap V4 Pool manager, router and keeper.</strong> The V4 pool manager is the shared settlement contract for Uniswap V4 pools; the router and keeper support V4 reward routes. Uniswap V4 has no separate factory; the pool manager fills that role.</li>
          </ul>
          <h2 id="source">Source code <a href="#source">#</a></h2>
          <p>Chop's contracts build on earlier open-source work. Individual contract files record their license notices; the repository's NOTICE file and upstream provenance document describe that source.</p>
          <p>Source: Chop contracts. The repository records its Peapods source provenance and individual license notices. The hardened source is on <code>release/v1</code>; the newer <code>work/robinhood-eoa-handoff</code> candidate includes audit follow-up fixes. Final source and production addresses will be recorded after deployment. Historical audits do not attest the amended candidate.</p>
        `,
      },
    ],
  },
  {
    label: "Reference",
    pages: [
      {
        slug: "faq",
        nav: "FAQ",
        title: "FAQ",
        toc: [
          ["forecast", "Why doesn't Chop forecast rewards?"],
          ["farm", "Do I have to farm to earn?"],
          ["withdraw", "Can I withdraw at any time?"],
          ["below", "Why is my log token trading below its backing?"],
          ["ch", 'What does "ch" mean?'],
          ["convert", "What happens if rewards can't be converted to $CHOP?"],
          ["nobody", "What happens when nobody is farming a log?"],
          ["who", "Who runs Chop?"],
          ["team", "Is there a team allocation?"],
          ["name", 'Why "Chop"?'],
        ],
        body: `
          <h2 id="forecast">Why doesn't Chop forecast rewards? <a href="#forecast">#</a></h2>
          <p>Because it would be a guess. Rewards depend on how much people trade, and nobody can predict that. Each log shows what has actually been paid to farmers, from on-chain data.</p>
          <h2 id="farm">Do I have to farm to earn? <a href="#farm">#</a></h2>
          <p>No. Holding a log token benefits from the 15% log-token burn, which raises its backing. Farming earns a share of the $CHOP allocated to farmers and takes on impermanent loss.</p>
          <h2 id="withdraw">Can I withdraw at any time? <a href="#withdraw">#</a></h2>
          <p>Yes. There are no lockups. Unwrapping costs the log's unwrap fee. Stopping a farm costs only gas.</p>
          <h2 id="below">Why is my log token trading below its backing? <a href="#below">#</a></h2>
          <p>It trades in its own pool, and pool prices drift. Traders usually close the gap, but with thin liquidity it can take a while. The contract redeems at backing, minus the unwrap fee, while its exit path succeeds. Frontend unwrapping is currently disabled because the interface lacks minimum-output protection.</p>
          <h2 id="ch">What does "ch" mean? <a href="#ch">#</a></h2>
          <p>It marks a log token. chETH is ETH in a log.</p>
          <h2 id="convert">What happens if rewards can't be converted to $CHOP? <a href="#convert">#</a></h2>
          <p>The fee value waits until it can be converted to $CHOP by the configured fee route, then the farmer share is paid out. Trading keeps working. See <a href="/docs/harvesting">Harvesting</a>.</p>
          <h2 id="nobody">What happens when nobody is farming a log? <a href="#nobody">#</a></h2>
          <p>All $CHOP that would otherwise go to farmers is burned until someone stakes liquidity. It is not saved for the first farmer.</p>
          <h2 id="who">Who runs Chop? <a href="#who">#</a></h2>
          <p>See <a href="/docs/admin-powers">Who can change what</a> for the current contract controls and launch placeholders.</p>
          <h2 id="team">Is there a team allocation? <a href="#team">#</a></h2>
          <p>15% is reserved for product and marketing, and 15% goes to the team, locked for the first month, then vesting linearly over twelve. The remaining 70% sits in the liquidity pool, launched on Bankr. See <a href="/docs/chop-token">The $CHOP token</a>.</p>
          <h2 id="name">Why "Chop"? <a href="#name">#</a></h2>
          <p>Traders call a sideways, swingy market "chop". It's the market most strategies hate, and the one logs are built for.</p>
        `,
      },
      {
        slug: "glossary",
        nav: "Glossary",
        title: "Glossary",
        toc: [],
        body: `
          <p><strong>Backing.</strong> How much of the underlying token each log token is backed by. Measured in that token, and designed to only go up.</p>
          <p><strong>Burn.</strong> Destroying tokens permanently. Chop burns 15% of fees as log tokens, then burns 20% of the $CHOP funded by the remaining fee value after any partner share.</p>
          <p><strong>Farm.</strong> Adding log tokens and the log's paired token to its pool, then staking the liquidity to receive the farmer share of $CHOP funded by fees.</p>
          <p><strong>Gap.</strong> How far a log token's price is from its backing, in %. The log-side round trip costs about 1.5%, and the $CHOP market can add up to another 1% before arbitrage pays.</p>
          <p><strong>Harvest.</strong> Claiming your rewards.</p>
          <p><strong>Impermanent loss.</strong> The value you give up by providing liquidity instead of holding, when prices move. It shrinks if prices come back.</p>
          <p><strong>Liquidity (LP).</strong> Tokens deposited in a pool so others can trade against them.</p>
          <p><strong>Log.</strong> A vault that holds one token and issues a log token in return.</p>
          <p><strong>Log token.</strong> The token a log issues, like chETH. It trades in its own pool against the pair chosen at creation.</p>
          <p><strong>Paid to farmers.</strong> Rewards deposited for a log's farmers since launch, read from the chain.</p>
          <p><strong>Partner fee.</strong> An optional share of a log's fees sent to a partner. It starts at 0%, cannot exceed 5%, and can only be lowered after creation.</p>
          <p><strong>Slippage.</strong> How far the price may move between quoting and confirming before a transaction fails instead.</p>
          <p><strong>Treasury share.</strong> The share of remaining fee value routed to the protocol before the $CHOP swap. It is locked at 0%, so nothing goes to the protocol or team.</p>
          <p><strong>TWAP.</strong> Time-weighted average price. Chop uses a 10-minute average when converting fees into $CHOP.</p>
          <p><strong>Unwrap.</strong> Burning log tokens to get the underlying token back.</p>
          <p><strong>Wrap.</strong> Depositing a token into a log to receive log tokens.</p>
        `,
      },
    ],
  },
];

export function allDocs() {
  return docGroups.flatMap((group) => group.pages);
}

export function findDoc(slug) {
  const pages = allDocs();
  const index = pages.findIndex((page) => page.slug === slug);
  if (index === -1) return null;
  return { page: pages[index], prev: pages[index - 1] || null, next: pages[index + 1] || null };
}
