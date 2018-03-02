# mocha-streambuffer
A small utility to assert console output in mocha tests  

## Usage
```js
const StreamBuffer = require('mocha-streambuffer');
const assert = require('assert');

var stdout;

describe('StreamBuffer', function()
{
  before(function()
  {
    stdout = new StreamBuffer(process.stdout, true).hook();
  });
  
  beforeEach(function()
  {
    stdout.clean();
  });
  
  after(function()
  {
    stdout.unhook();
  });

  describe('Catch', function()
  {
    it('should catch stdout', function()
    {
      console.log('ping');
      assert.equal(stdout.buffer(), 'ping\n');
    });
  });

  describe('Includes', function()
  {
    it('should include ping', function()
    {
      console.log('ping');
      assert.ok(stdout.buffer().includes('ping'));
    });

  });

});

```


### StreamBuffer(stream, [verbose=true])
**stream:** The stream to buffer  
**verbose:** Whether to still write to the stream

**StreamBuffer.hook() => this**  
Starts buffering

**StreamBuffer.unhook() => this**  
Stops buffering

**StreamBuffer.buffer() => String**  
Returns the buffer

**StreamBuffer.clean() => String**  
Resets the buffer and returns it


## Credits
[jjm](https://stackoverflow.com/users/916451/jjm) for [this excellent post](http://stackoverflow.com/questions/18543047/mocha-monitor-application-output) on stackoverflow.
