namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(IAccountRepository _accountRepository) : ControllerBase
{
 /// <summary>
    /// Create accounts
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>LoggedInDto</returns>
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<LoggedInDto>> Register(RegisterDto userInput, CancellationToken cancellationToken) // parameter
    {
        if (userInput.Password != userInput.ConfirmPassword) // check if passwords match
            return BadRequest("Passwords don't match!"); // is it correct? What does it do?

        LoggedInDto? loggedInDto = await _accountRepository.CreateAsync(userInput, cancellationToken); // argument

        // OLD code
        // return loggedInDto.Token is null
        //     ? BadRequest("Login has failed. Try again.")
        //     : loggedInDto;

        if (!string.IsNullOrEmpty(loggedInDto.Token)) // success
            return Ok(loggedInDto);
        else if (loggedInDto.Errors.Count != 0)
            return BadRequest(loggedInDto.Errors);
        else
            return BadRequest("Registration has failed. . Try again or contact the support.");
    }

    /// <summary>
    /// Login accounts
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>LoggedInDto</returns>
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<LoggedInDto>> Login(LoginDto userInput, CancellationToken cancellationToken)
    {
        LoggedInDto? loggedInDto = await _accountRepository.LoginAsync(userInput, cancellationToken);

        // OLD code
        // return loggedInDto.Token is null
        //     ? BadRequest("Login has failed. Try again.")
        //     : loggedInDto;

        if (!string.IsNullOrEmpty(loggedInDto.Token)) // success
            return Ok(loggedInDto);
        else if (loggedInDto.IsWrongCreds)
            return Unauthorized("Invalid username or password.");
        else if (loggedInDto.Errors.Count != 0)
            return BadRequest(loggedInDto.Errors);
        else
            return BadRequest("Login has failed. Try again or contact the support.");
    }

    /// <summary>
    /// Authorize the token
    /// </summary>
    /// <param></param>
    /// <returns>ActionResult</returns>
    [HttpGet]
    public ActionResult AuthorizeLoggedInUser() =>
        Ok(new { message = "token is still valid and user is authorized" });


    // [AllowAnonymous]
    // Reset Passsword

    // [Authorize]
    // Deactivate

    // [Authorize]
    // Delete
}
