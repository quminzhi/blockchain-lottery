const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
  // Ensure the lottery contract is deployed
  before(async () => {
    instance = await Lottery.deployed()
  })

  it('Ensure that the starting balance is 0', async () => {
    let balance = await instance.getBalance()
    assert.equal(balance, 0, 'The initial balance should be 0')
  })

  it('Allows multiple players to join the game', async () => {
    await instance.enter({from: accounts[0], value: web3.utils.toWei('5', 'ether')});
    await instance.enter({from: accounts[1], value: web3.utils.toWei('3', 'ether')});
    let nplayers = await instance.getPlayers()
    assert.equal(nplayers.length, 2, 'The number of players should be two after two players joined')
  })

  it('Allows a player to join with two ethers and three players are in the game', async() => {
    await instance.enter({from: accounts[0], value: web3.utils.toWei('2', 'ether')});
    const contractAddress = instance.address
    const balance = await web3.eth.getBalance(contractAddress)
    // Note the second parameter is measured by wei, 1 ether = 1000000000000000000 wei
    assert.equal(balance, 10000000000000000000, 'The balance should be 13 after three players joined with 5, 3, and 2 ethers respectively')

    let nplayers = await instance.getPlayers()
    assert.equal(nplayers.length, 3, 'The number of players should be three now')
  })
})

