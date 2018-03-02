/**
 * Inspired by
 * http://stackoverflow.com/questions/18543047/mocha-monitor-application-output
 */
class StreamBuffer
{
  /**
   * @param Object stream
   * @param Boolean [verbose=true]
   */
  constructor(stream, verbose = true)
  {
    this.stream = stream;
    this.verbose = verbose;

    this.write;
    this.buf;
  }

  hook()
  {
    this.buf = '';
    this.write = this.stream.write;

    this.stream.write = function(chunk, encoding, callback)
    {
      if (this.verbose) this.write.apply(this.stream, arguments);

      this.buf += chunk.toString();

    }.bind(this);

    return this;
  }

  buffer()
  {
    return this.buf;
  }

  clean()
  {
    var out = this.buf;
    this.buf = '';
    return out;
  }

  unhook()
  {
    this.stream.write = this.write;
    this.write = undefined;
    this.buf = undefined;
    return this;
  }
}

module.exports = StreamBuffer;
